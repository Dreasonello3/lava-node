package badgegenerator

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"github.com/btcsuite/btcd/btcec"
	"github.com/lavanet/lava/protocol/badgegenerator/grpc"
	"github.com/lavanet/lava/utils"
	epochstoragetypes "github.com/lavanet/lava/x/epochstorage/types"
	pairingtypes "github.com/lavanet/lava/x/pairing/types"
	"sync/atomic"
)

type Server struct {
	pairingtypes.UnimplementedBadgeGeneratorServer
	ProjectsConfiguration map[string]*ProjectConfiguration //userid/project_public_key
	epoch                 uint64
	grpcFetcher           *grpc.GRPCFetcher
	ChainId               string
}

func NewServer(grpcUrl string, chainId string, userData string) (*Server, error) {
	server := &Server{
		ProjectsConfiguration: map[string]*ProjectConfiguration{},
		ChainId:               chainId,
	}

	if userData != "" {
		projectsData := make(map[string]*ProjectConfiguration)
		err := json.Unmarshal([]byte(userData), &projectsData)
		if err != nil {
			return nil, err
		}
		server.ProjectsConfiguration = projectsData
	}
	grpcFetch, err := grpc.NewGRPCFetcher(grpcUrl)
	if err != nil {
		return nil, err
	}
	server.grpcFetcher = grpcFetch
	return server, nil
}

func (s *Server) UpdateEpoch(epoch uint64) {
	utils.LavaFormatDebug("Got epoch update", utils.Attribute{Key: "epoch", Value: epoch})
	atomic.StoreUint64(&s.epoch, epoch)
}

func (s *Server) GetEpoch() uint64 {
	return atomic.LoadUint64(&s.epoch)
}

func (s *Server) GenerateBadge(ctx context.Context, req *pairingtypes.GenerateBadgeRequest) (*pairingtypes.GenerateBadgeResponse, error) {
	projectData, err := s.validateRequest(req)
	if err != nil {
		return nil, err
	}
	badge := pairingtypes.Badge{
		CuAllocation: uint64(projectData.EpochsMaxCu),
		Epoch:        s.GetEpoch(),
		Address:      req.BadgeAddress,
		LavaChainId:  s.ChainId,
	}
	result := pairingtypes.GenerateBadgeResponse{
		Badge:       &badge,
		PairingList: make([]*epochstoragetypes.StakeEntry, 0),
	}

	err = s.addPairingListToResponse(req, projectData, &result)
	if err != nil {
		return nil, err
	}

	err = signTheResponse(projectData.ProjectPrivateKey, &result)
	if err != nil {
		return nil, err
	}
	return &result, nil
}

func (s *Server) validateRequest(in *pairingtypes.GenerateBadgeRequest) (*ProjectConfiguration, error) {
	if in == nil {
		err := fmt.Errorf("invalid request, no input data provided")
		utils.LavaFormatError("Validation failed", err)
		return nil, err
	}
	if in.BadgeAddress == "" || in.ProjectId == "" {
		err := fmt.Errorf("bad request, no valid input data provided")
		utils.LavaFormatError("Validation failed", err)
		return nil, err
	}

	projectData, exist := s.ProjectsConfiguration[in.ProjectId]
	if !exist {
		err := fmt.Errorf("bad request, invalid project to perform this request")
		utils.LavaFormatError(
			"Validation failed",
			err,
			utils.Attribute{
				Key:   "BadgeAddress",
				Value: in.BadgeAddress,
			}, utils.Attribute{
				Key:   "ProjectId",
				Value: in.ProjectId,
			},
		)
		return nil, err
	}
	return projectData, nil
}

func (s *Server) addPairingListToResponse(request *pairingtypes.GenerateBadgeRequest, configurations *ProjectConfiguration, response *pairingtypes.GenerateBadgeResponse) error {
	if request.SpecId != "" {
		if configurations.PairingList == nil || response.Badge.Epoch != configurations.UpdatedEpoch {
			pairings, _, err := s.grpcFetcher.FetchPairings(request.SpecId, configurations.ProjectPublicKey)
			if err != nil {
				utils.LavaFormatError("Failed to get pairings", err,
					utils.Attribute{Key: "epoch", Value: s.GetEpoch()},
					utils.Attribute{Key: "BadgeAddress", Value: request.GetBadgeAddress()},
					utils.Attribute{Key: "ProjectId", Value: request.ProjectId})
				return err
			}
			configurations.PairingList = pairings
			configurations.UpdatedEpoch = response.Badge.Epoch
		}

		for _, entry := range *configurations.PairingList {
			response.PairingList = append(response.PairingList, &entry)
		}
	}
	return nil
}

// note this update the signature of the response
func signTheResponse(privateKeyString string, response *pairingtypes.GenerateBadgeResponse) error {
	responseString, err := json.Marshal(*response)
	if err != nil {
		utils.LavaFormatError("Couldn't marshall response", err)
		return err
	}
	privateKeyBytes, _ := hex.DecodeString(privateKeyString)
	privateKey, _ := btcec.PrivKeyFromBytes(btcec.S256(), privateKeyBytes)
	hash := sha256.Sum256(responseString)
	signature, err := btcec.SignCompact(btcec.S256(), privateKey, hash[:], false)
	if err != nil {
		utils.LavaFormatError("Couldn't sign response", err)
		return err
	}
	response.Badge.ProjectSig = signature
	return nil
}
