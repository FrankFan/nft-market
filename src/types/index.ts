export interface NftCollectionItemType {
  token_address: string;
  token_id: string;
  amount: string;
  token_hash: string;
  block_number_minted: string;
  updated_at: null;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  last_token_uri_sync: string;
  last_metadata_sync: string;
  minter_address: string;
}

export type RankType = {
  address: string;
  contractMetadata: {
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSea: {
      floorPrice: number;
      collectionName: string;
      safelistRequestStatus: string;
      imageUrl: string;
      description: string;
      lastIngestedAt: string;
    };
  };
};

export type RankListType = RankType[];
