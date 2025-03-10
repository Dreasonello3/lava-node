package rpcconsumer

import (
	"time"

	"github.com/dgraph-io/ristretto"
	"github.com/lavanet/lava/v2/utils"
)

// this class handles seen block values in requests
const (
	CacheMaxCost     = 2000  // each item cost would be 1
	CacheNumCounters = 20000 // expect 2000 items
	EntryTTL         = 5 * time.Minute
)

type ConsumerConsistency struct {
	cache  *ristretto.Cache
	specId string
}

func (cc *ConsumerConsistency) setLatestBlock(key string, block int64) {
	// we keep consistency data for 5 minutes
	// if in that time no new block was updated we will remove seen data and let providers return what they have
	cc.cache.SetWithTTL(key, block, 1, EntryTTL)
}

func (cc *ConsumerConsistency) getLatestBlock(key string) (block int64, found bool) {
	storedVal, found := cc.cache.Get(key)
	if found {
		var ok bool
		block, ok = storedVal.(int64)
		if !ok {
			utils.LavaFormatFatal("invalid usage of cache", nil, utils.Attribute{Key: "storedVal", Value: storedVal})
		}
	} else {
		// no data
		block = 0
	}
	return block, found
}

func (cc *ConsumerConsistency) Key(dappId string, ip string) string {
	return dappId + "__" + ip
}

func (cc *ConsumerConsistency) SetSeenBlock(blockSeen int64, dappId string, ip string) {
	if cc == nil {
		return
	}
	block, _ := cc.getLatestBlock(cc.Key(dappId, ip))
	if block < blockSeen {
		cc.setLatestBlock(cc.Key(dappId, ip), blockSeen)
	}
}

func (cc *ConsumerConsistency) GetSeenBlock(dappId string, ip string) (int64, bool) {
	return cc.getLatestBlock(cc.Key(dappId, ip))
}

func NewConsumerConsistency(specId string) *ConsumerConsistency {
	cache, err := ristretto.NewCache(&ristretto.Config{NumCounters: CacheNumCounters, MaxCost: CacheMaxCost, BufferItems: 64, IgnoreInternalCost: true})
	if err != nil {
		utils.LavaFormatFatal("failed setting up cache for consumer consistency", err)
	}
	return &ConsumerConsistency{cache: cache, specId: specId}
}
