package types

import (
	fmt "fmt"
	"strconv"
	"unicode"

	epochstoragetypes "github.com/lavanet/lava/x/epochstorage/types"
)

const minCU = 1

func (spec Spec) ValidateSpec(maxCU uint64) (map[string]string, error) {
	details := map[string]string{"spec": spec.Name, "status": strconv.FormatBool(spec.Enabled), "chainID": spec.Index}
	functionTags := map[string]bool{}

	availableAPIInterface := map[string]struct{}{
		APIInterfaceJsonRPC:       {},
		APIInterfaceTendermintRPC: {},
		APIInterfaceRest:          {},
		APIInterfaceGrpc:          {},
	}
	availavleEncodings := map[string]struct{}{
		EncodingBase64: {},
		EncodingHex:    {},
	}

	for _, char := range spec.Name {
		if !unicode.IsLower(char) && char != ' ' {
			return details, fmt.Errorf("spec name must contain lowercase characters only")
		}
	}

	if spec.ReliabilityThreshold == 0 {
		return details, fmt.Errorf("ReliabilityThreshold can't be zero")
	}

	if spec.BlocksInFinalizationProof == 0 {
		return details, fmt.Errorf("BlocksInFinalizationProof can't be zero")
	}

	if spec.AverageBlockTime <= 0 {
		return details, fmt.Errorf("AverageBlockTime can't be zero")
	}

	if spec.AllowedBlockLagForQosSync <= 0 {
		return details, fmt.Errorf("AllowedBlockLagForQosSync can't be zero")
	}

	if spec.MinStakeClient.Denom != epochstoragetypes.TokenDenom || spec.MinStakeClient.Amount.IsZero() {
		return details, fmt.Errorf("MinStakeClient can't be zero and must have denom of ulava")
	}

	if spec.MinStakeProvider.Denom != epochstoragetypes.TokenDenom || spec.MinStakeProvider.Amount.IsZero() {
		return details, fmt.Errorf("MinStakeProvider can't be zero and must have denom of ulava")
	}

	for _, apiCollection := range spec.ApiCollections {
		if len(apiCollection.Apis) == 0 {
			return details, fmt.Errorf("api apiCollection list empty for %v", apiCollection.CollectionData)
		}
		if _, ok := availableAPIInterface[apiCollection.CollectionData.ApiInterface]; !ok {
			return details, fmt.Errorf("unsupported api interface %v", apiCollection.CollectionData.ApiInterface)
		}
		// validate function tags
		for _, parsing := range apiCollection.Parsing {
			// Validate tag name
			if parsing.FunctionTag == "" {
				return details, fmt.Errorf("empty parsing function tag %v", parsing.FunctionTag)
			}
			result := false
			for _, tag := range SupportedTags {
				if tag == parsing.FunctionTag {
					result = true
					functionTags[parsing.FunctionTag] = true
				}
			}
			if !result {
				details["apiCollection"] = fmt.Sprintf("%v", apiCollection.CollectionData)
				return details, fmt.Errorf("unsupported function tag %s", parsing.FunctionTag)
			}
			if parsing.ResultParsing.Encoding != "" {
				if _, ok := availavleEncodings[parsing.ResultParsing.Encoding]; !ok {
					return details, fmt.Errorf("unsupported api encoding %s in apiCollection %v ", parsing.ResultParsing.Encoding, apiCollection.CollectionData)
				}
			}
		}
		// validate apis
		for _, api := range apiCollection.Apis {
			if api.ComputeUnits < minCU || api.ComputeUnits > maxCU {
				details["api"] = api.Name
				return details, fmt.Errorf("compute units out or range")
			}
		}
	}

	if spec.DataReliabilityEnabled && spec.Enabled {
		for _, tag := range []string{GET_BLOCKNUM, GET_BLOCK_BY_NUM} {
			if found := functionTags[tag]; !found {
				return details, fmt.Errorf("missing tagged functions for hash comparison: %s", tag)
			}
		}
	}

	return details, nil
}

func (spec *Spec) CombineCollections(parentsCollections map[CollectionData][]*ApiCollection) error {
	for idx, collectionsToCombine := range parentsCollections {
		if len(collectionsToCombine) == 0 {
			return fmt.Errorf("collection with length 0 %v", idx)
		}
		combined, err := collectionsToCombine[0].CombineWithOthers(collectionsToCombine[1:])
		if err != nil {
			return err
		}
		spec.ApiCollections = append(spec.ApiCollections, combined)
	}
	return nil
}
