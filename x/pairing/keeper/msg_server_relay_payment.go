package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/lavanet/lava/utils"
	"github.com/lavanet/lava/utils/sigs"
	epochstoragetypes "github.com/lavanet/lava/x/epochstorage/types"
	"github.com/lavanet/lava/x/pairing/types"
	"github.com/tendermint/tendermint/libs/log"
)

type BadgeData struct {
	Badge       types.Badge
	BadgeSigner sdk.AccAddress
}

const (
	maxComplaintsPerEpoch                     = 3
	collectPaymentsFromNumberOfPreviousEpochs = 2
	providerPaymentMultiplier                 = 2 // multiplying the amount of payments to protect provider from unstaking
)

func (k msgServer) RelayPayment(goCtx context.Context, msg *types.MsgRelayPayment) (*types.MsgRelayPaymentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	logger := k.Logger(ctx)
	lavaChainID := ctx.BlockHeader().ChainID
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}

	addressEpochBadgeMap := map[string]BadgeData{}
	for _, relay := range msg.Relays {
		if relay.Badge != nil {
			mapKey := types.CreateAddressEpochBadgeMapKey(relay.Badge.Address, relay.Badge.Epoch)
			_, ok := addressEpochBadgeMap[mapKey]
			if !ok {
				badgeSigner, err := sigs.ExtractSignerAddressFromBadge(*relay.Badge)
				if err != nil {
					return nil, utils.LavaFormatError("can't extract badge's signer from badge's project signature", err,
						utils.Attribute{Key: "badgeUserAddress", Value: relay.Badge.Address},
						utils.Attribute{Key: "epoch", Value: relay.Badge.Epoch},
					)
				}
				badgeData := BadgeData{
					Badge:       *relay.Badge,
					BadgeSigner: badgeSigner,
				}
				addressEpochBadgeMap[mapKey] = badgeData
			} else {
				return nil, utils.LavaFormatError("address already exist in addressEpochBadgeMap", nil,
					utils.Attribute{Key: "address", Value: relay.Badge.Address},
					utils.Attribute{Key: "epoch", Value: relay.Badge.Epoch},
				)
			}
		}
	}

	for relayIdx, relay := range msg.Relays {
		if relay.LavaChainId != lavaChainID {
			return nil, utils.LavaFormatWarning("relay request for the wrong lava chain", fmt.Errorf("relay_payment_wrong_lava_chain_id"),
				utils.Attribute{Key: "relay.LavaChainId", Value: relay.LavaChainId},
				utils.Attribute{Key: "expected_ChainID", Value: lavaChainID},
			)
		}
		if relay.Epoch > ctx.BlockHeight() {
			return nil, utils.LavaFormatWarning("invalid block in relay msg", fmt.Errorf("relay request for a block in the future"),
				utils.Attribute{Key: "blockheight", Value: ctx.BlockHeight()},
				utils.Attribute{Key: "relayBlock", Value: relay.Epoch},
			)
		}

		clientAddr, err := sigs.ExtractSignerAddress(relay)
		if err != nil {
			return nil, utils.LavaFormatWarning("recover PubKey from relay failed", err,
				utils.Attribute{Key: "sig", Value: relay.Sig},
			)
		}

		addressEpochBadgeMapKey := types.CreateAddressEpochBadgeMapKey(clientAddr.String(), uint64(relay.Epoch))
		badgeData, ok := addressEpochBadgeMap[addressEpochBadgeMapKey]
		// if badge is found in the map, clientAddr will change (assuming the badge is valid) since the badge user is not a valid consumer (the badge signer is)
		if ok {
			if !badgeData.Badge.IsBadgeValid(clientAddr.String(), relay.LavaChainId, uint64(relay.Epoch)) {
				return nil, utils.LavaFormatWarning("badge must match traits in relay request", fmt.Errorf("invalid badge"),
					utils.Attribute{Key: "badgeAddress", Value: badgeData.Badge.Address},
					utils.Attribute{Key: "badgeLavaChainId", Value: badgeData.Badge.LavaChainId},
					utils.Attribute{Key: "badgeEpoch", Value: badgeData.Badge.Epoch},
					utils.Attribute{Key: "relayAddress", Value: clientAddr},
					utils.Attribute{Key: "relayLavaChainId", Value: relay.LavaChainId},
					utils.Attribute{Key: "relayEpoch", Value: relay.Epoch},
				)
			}

			badgeUsedCuKey := types.BadgeUsedCuKey(badgeData.Badge.ProjectSig, relay.Provider)
			badgeUsedCuMapEntry, found := k.GetBadgeUsedCu(ctx, badgeUsedCuKey)
			if !found {
				// setting a timer with a callback to delete the badgeUsedCuEntry after badge.Epoch+blocksToSave (see keeper.go)
				badgeUsedCuTimerExpiryBlock := k.BadgeUsedCuExpiry(ctx, badgeData.Badge)
				if badgeUsedCuTimerExpiryBlock <= uint64(ctx.BlockHeight()) {
					return nil, utils.LavaFormatWarning("badge rejected", fmt.Errorf("badge used CU entry validity expired"),
						utils.Attribute{Key: "badgeUsedCuTimerExpiryBlock", Value: badgeUsedCuTimerExpiryBlock},
						utils.Attribute{Key: "currentBlock", Value: uint64(ctx.BlockHeight())},
					)
				}
				// timerKey = badgeUsedCuMapKey since all badgeUsedCuMapKey keys are unique - can be used to differentiate the timers
				k.badgeTimerStore.AddTimerByBlockHeight(ctx, badgeUsedCuTimerExpiryBlock, badgeUsedCuKey, []byte{})

				badgeUsedCuMapEntry = types.BadgeUsedCu{
					BadgeUsedCuKey: badgeUsedCuKey,
					UsedCu:         0,
				}
			}

			// enforce badge CU overuse
			if relay.CuSum+badgeUsedCuMapEntry.UsedCu > badgeData.Badge.CuAllocation {
				return nil, utils.LavaFormatWarning("badge CU allocation exceeded", fmt.Errorf("could not update badge's used CU"),
					utils.Attribute{Key: "relayCuSum", Value: relay.CuSum},
					utils.Attribute{Key: "badgeCuLeft", Value: badgeData.Badge.CuAllocation - badgeUsedCuMapEntry.UsedCu},
				)
			}

			badgeUsedCuMapEntry.UsedCu += relay.CuSum
			k.SetBadgeUsedCu(ctx, badgeUsedCuMapEntry)

			// badge is valid & CU enforced -> switch address to badge signer (developer key) and continue with payment
			clientAddr = badgeData.BadgeSigner
		}

		providerAddr, err := sdk.AccAddressFromBech32(relay.Provider)
		if err != nil {
			return nil, utils.LavaFormatWarning("invalid provider address in relay msg", err,
				utils.Attribute{Key: "provider", Value: relay.Provider},
				utils.Attribute{Key: "creator", Value: msg.Creator},
			)
		}
		if !providerAddr.Equals(creator) {
			return nil, utils.LavaFormatWarning("invalid provider address in relay msg", fmt.Errorf("creator and signed provider mismatch"),
				utils.Attribute{Key: "provider", Value: relay.Provider},
				utils.Attribute{Key: "creator", Value: msg.Creator},
			)
		}

		// TODO: add support for spec changes
		spec, found := k.specKeeper.GetSpec(ctx, relay.SpecId)
		if !found || !spec.Enabled {
			return nil, utils.LavaFormatWarning("invalid spec ID in relay msg", fmt.Errorf("spec in proof is not found or disabled"),
				utils.Attribute{Key: "chainID", Value: relay.SpecId},
			)
		}

		isValidPairing, allowedCU, servicersToPair, err := k.Keeper.ValidatePairingForClient(
			ctx,
			relay.SpecId,
			clientAddr,
			providerAddr,
			uint64(relay.Epoch),
		)
		if err != nil {
			return nil, utils.LavaFormatWarning("invalid pairing on proof of relay", err,
				utils.Attribute{Key: "client", Value: clientAddr.String()},
				utils.Attribute{Key: "provider", Value: providerAddr.String()},
			)
		}
		if !isValidPairing {
			return nil, utils.LavaFormatWarning("invalid pairing on proof of relay", fmt.Errorf("pairing result doesn't include provider"),
				utils.Attribute{Key: "client", Value: clientAddr.String()},
				utils.Attribute{Key: "provider", Value: providerAddr.String()},
			)
		}

		epochStart, _, err := k.epochStorageKeeper.GetEpochStartForBlock(ctx, uint64(relay.Epoch))
		if err != nil {
			return nil, utils.LavaFormatWarning("problem getting epoch start", err,
				utils.Attribute{Key: "relayEpoch", Value: relay.Epoch},
				utils.Attribute{Key: "epochStart", Value: epochStart},
			)
		}

		// this prevents double spend attacks, and tracks the CU per session a client can use
		totalCUInEpochForUserProvider, err := k.Keeper.AddEpochPayment(ctx, relay.SpecId, epochStart, clientAddr, providerAddr, relay.CuSum, strconv.FormatUint(relay.SessionId, 16))
		if err != nil {
			// double spending on user detected!
			return nil, utils.LavaFormatWarning("double spending detected", err,
				utils.Attribute{Key: "epoch", Value: epochStart},
				utils.Attribute{Key: "client", Value: clientAddr.String()},
				utils.Attribute{Key: "provider", Value: providerAddr.String()},
				utils.Attribute{Key: "unique_ID", Value: relay.SessionId},
			)
		}

		err = k.Keeper.EnforceClientCUsUsageInEpoch(ctx, allowedCU, totalCUInEpochForUserProvider, clientAddr, relay.SpecId, uint64(relay.Epoch))
		if err != nil {
			// TODO: maybe give provider money but burn user, colluding?
			// TODO: display correct totalCU and usedCU for provider
			return nil, utils.LavaFormatWarning("user bypassed CU limit", err,
				utils.Attribute{Key: "epoch", Value: epochStart},
				utils.Attribute{Key: "client", Value: clientAddr.String()},
				utils.Attribute{Key: "provider", Value: providerAddr.String()},
				utils.Attribute{Key: "cuToPay", Value: relay.CuSum},
				utils.Attribute{Key: "totalCUInEpochForUserProvider", Value: totalCUInEpochForUserProvider},
			)
		}

		// pairing is valid, we can pay provider for work
		reward := k.Keeper.MintCoinsPerCU(ctx).MulInt64(int64(relay.CuSum))
		if reward.IsZero() {
			continue
		}

		rewardCoins := sdk.Coins{sdk.Coin{Denom: epochstoragetypes.TokenDenom, Amount: reward.TruncateInt()}}

		if len(msg.DescriptionString) > 20 {
			msg.DescriptionString = msg.DescriptionString[:20]
		}
		details := map[string]string{"chainID": fmt.Sprintf(relay.SpecId), "client": clientAddr.String(), "provider": providerAddr.String(), "CU": strconv.FormatUint(relay.CuSum, 10), "BasePay": rewardCoins.String(), "totalCUInEpoch": strconv.FormatUint(totalCUInEpochForUserProvider, 10), "uniqueIdentifier": strconv.FormatUint(relay.SessionId, 10), "descriptionString": msg.DescriptionString}

		if relay.QosReport != nil {
			QoS, err := relay.QosReport.ComputeQoS()
			if err != nil {
				return nil, utils.LavaFormatWarning("bad QoSReport", err)
			}
			// TODO: QoSReport is deprecated remove after version 0.12.0
			details["QoSReport"] = "Latency: " + relay.QosReport.Latency.String() + ", Availability: " + relay.QosReport.Availability.String() + ", Sync: " + relay.QosReport.Sync.String()
			// allow easier extraction of components
			details["QoSLatency"] = relay.QosReport.Latency.String()
			details["QoSAvailability"] = relay.QosReport.Availability.String()
			details["QoSSync"] = relay.QosReport.Sync.String()
			details["QoSScore"] = QoS.String()

			reward = reward.Mul(QoS.Mul(k.QoSWeight(ctx)).Add(sdk.OneDec().Sub(k.QoSWeight(ctx)))) // reward*QOSScore*QOSWeight + reward*(1-QOSWeight) = reward*(QOSScore*QOSWeight + (1-QOSWeight))
			rewardCoins = sdk.Coins{sdk.Coin{Denom: epochstoragetypes.TokenDenom, Amount: reward.TruncateInt()}}
		}

		details["clientFee"] = "0"
		details["reliabilityPay"] = "false"
		details["Mint"] = details["BasePay"]

		// Mint to module
		if !rewardCoins.AmountOf(epochstoragetypes.TokenDenom).IsZero() {
			err = k.Keeper.bankKeeper.MintCoins(ctx, types.ModuleName, rewardCoins)
			if err != nil {
				utils.LavaFormatError("MintCoins Failed", err)
				panic(fmt.Sprintf("module failed to mint coins to give to provider: %s", err))
			}
			//
			// Send to provider
			err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, providerAddr, rewardCoins)
			if err != nil {
				utils.LavaFormatError("SendCoinsFromModuleToAccount Failed", err)
				panic(fmt.Sprintf("failed to transfer minted new coins to provider, %s account: %s", err, providerAddr))
			}
		}

		details["relayNumber"] = strconv.FormatUint(relay.RelayNum, 10)
		// differentiate between different relays by providing the index in the keys
		successDetails := appendRelayPaymentDetailsToEvent(details, uint64(relayIdx))
		// calling the same event repeatedly within a transaction just appends the new keys to the event
		utils.LogLavaEvent(ctx, logger, types.RelayPaymentEventName, successDetails, "New Proof Of Work Was Accepted")

		err = k.chargeComputeUnitsToProjectAndSubscription(ctx, clientAddr, relay)
		if err != nil {
			return nil, utils.LavaFormatError("Failed charging CU to project and subscription", err)
		}

		// update provider payment storage with complainer's CU
		err = k.updateProviderPaymentStorageWithComplainerCU(ctx, relay.UnresponsiveProviders, logger, epochStart, relay.SpecId, relay.CuSum, servicersToPair, clientAddr)
		if err != nil {
			utils.LogLavaEvent(ctx, logger, types.UnresponsiveProviderUnstakeFailedEventName, map[string]string{"err:": err.Error()}, "Error Unresponsive Providers could not unstake")
		}
	}

	return &types.MsgRelayPaymentResponse{}, nil
}

func (k msgServer) updateProviderPaymentStorageWithComplainerCU(ctx sdk.Context, unresponsiveData []byte, logger log.Logger, epoch uint64, chainID string, cuSum uint64, servicersToPair uint64, clientAddr sdk.AccAddress) error {
	var unresponsiveProviders []string

	// check that unresponsiveData exists
	if len(unresponsiveData) == 0 {
		return nil
	}

	// check that servicersToPair is bigger than 1
	if servicersToPair <= 1 {
		servicersToPair = 2
	}

	// unmarshal the byte array unresponsiveData to get a list of unresponsive providers Bech32 addresses
	err := json.Unmarshal(unresponsiveData, &unresponsiveProviders)
	if err != nil {
		return utils.LavaFormatError("unable to unmarshal unresponsive providers", err, []utils.Attribute{{Key: "UnresponsiveProviders", Value: unresponsiveData}, {Key: "dataLength", Value: len(unresponsiveData)}}...)
	}

	// check there are unresponsive providers
	if len(unresponsiveProviders) == 0 {
		// nothing to do.
		return nil
	}

	// the added complainer CU takes into account the number of providers the client complained on and the number
	complainerCuToAdd := cuSum / (uint64(len(unresponsiveProviders)) * (servicersToPair - 1))

	// iterate over the unresponsive providers list and update their complainers_total_cu
	for _, unresponsiveProvider := range unresponsiveProviders {
		// get provider address
		sdkUnresponsiveProviderAddress, err := sdk.AccAddressFromBech32(unresponsiveProvider)
		if err != nil { // if bad data was given, we cant parse it so we ignote it and continue this protects from spamming wrong information.
			utils.LavaFormatError("unable to sdk.AccAddressFromBech32(unresponsive_provider)", err, utils.Attribute{Key: "unresponsive_provider_address", Value: unresponsiveProvider})
			continue
		}

		// get this epoch's epochPayments object
		epochPayments, found, key := k.GetEpochPaymentsFromBlock(ctx, epoch)
		if !found {
			// the epochPayments object should exist since we already paid. if not found, print an error and continue
			utils.LavaFormatError("did not find epochPayments object", err, utils.Attribute{Key: "epochPaymentsKey", Value: key})
			continue
		}

		// get the providerPaymentStorage object using the providerStorageKey
		providerStorageKey := k.GetProviderPaymentStorageKey(ctx, chainID, epoch, sdkUnresponsiveProviderAddress)
		providerPaymentStorage, found := k.GetProviderPaymentStorage(ctx, providerStorageKey)

		if !found {
			// providerPaymentStorage not found (this provider has no payments in this epoch and also no complaints) -> we need to add one complaint
			emptyProviderPaymentStorageWithComplaint := types.ProviderPaymentStorage{
				Index:                                  providerStorageKey,
				UniquePaymentStorageClientProviderKeys: []string{},
				Epoch:                                  epoch,
				ComplainersTotalCu:                     uint64(0),
			}

			// append the emptyProviderPaymentStorageWithComplaint to the epochPayments object's providerPaymentStorages
			epochPayments.ProviderPaymentStorageKeys = append(epochPayments.GetProviderPaymentStorageKeys(), emptyProviderPaymentStorageWithComplaint.GetIndex())
			k.SetEpochPayments(ctx, epochPayments)

			// assign providerPaymentStorage with the new empty providerPaymentStorage
			providerPaymentStorage = emptyProviderPaymentStorageWithComplaint
		}

		// add complainer's used CU to providerPaymentStorage
		providerPaymentStorage.ComplainersTotalCu += complainerCuToAdd

		// set the final provider payment storage state including the complaints
		k.SetProviderPaymentStorage(ctx, providerPaymentStorage)
	}

	return nil
}

func (k Keeper) chargeComputeUnitsToProjectAndSubscription(ctx sdk.Context, clientAddr sdk.AccAddress, relay *types.RelaySession) error {
	project, err := k.projectsKeeper.GetProjectForDeveloper(ctx, clientAddr.String(), uint64(relay.Epoch))
	if err != nil {
		return fmt.Errorf("failed to get project for client")
	}

	err = k.projectsKeeper.ChargeComputeUnitsToProject(ctx, project, uint64(ctx.BlockHeight()), relay.CuSum)
	if err != nil {
		return fmt.Errorf("failed to add CU to the project")
	}

	err = k.subscriptionKeeper.ChargeComputeUnitsToSubscription(ctx, project.GetSubscription(), uint64(ctx.BlockHeight()), relay.CuSum)
	if err != nil {
		return fmt.Errorf("failed to add CU to the subscription")
	}

	return nil
}

func appendRelayPaymentDetailsToEvent(from map[string]string, uniqueIdentifier uint64) (to map[string]string) {
	to = map[string]string{}
	sessionIDStr := strconv.FormatUint(uniqueIdentifier, 10)
	for key, value := range from {
		to[key+"."+sessionIDStr] = value
	}
	return to
}
