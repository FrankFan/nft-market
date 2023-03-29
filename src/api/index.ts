import { requestApi } from './requestApi';

const debug = false;

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const baseURL = `${API_DOMAIN}`;

const alchemy_api_key = `1GfMyHJVGOiE3wGfvx8riJhB_THIf9Dw`;
const alchemy_base_url = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemy_api_key}`;

type NftCollectionType = {
  contractAddress: string;
  chainId: string;
  limit?: number;
  cursor?: string;
};

export interface NftDetailType {
  contractAddress: string;
  tokenId: string;
}

/**
 * 获取 nft 合集数据内容
 * https://docs.moralis.io/web3-data-api/evm/reference/get-contract-nfts
 */
export function getNftByCollection({
  contractAddress,
  chainId,
  limit,
  cursor,
}: NftCollectionType) {
  return requestApi({
    url: `${baseURL}/nft/${contractAddress}`,
    method: 'get',
    body: {
      chainId,
      limit,
      normalizeMetadata: true,
      // disable_totals: true, // not work
      cursor,
    },
    debug,
  });
}

/**
 * 根据合约地址、tokenId 获取nft metadata 详情数据
 * https://docs.moralis.io/web3-data-api/evm/reference/get-nft-metadata
 */
export function getNFTDetaildData({ contractAddress, tokenId }: NftDetailType) {
  return requestApi({
    url: `${baseURL}/nft/${contractAddress}/${tokenId}`,
    method: 'get',
    body: {
      normalizeMetadata: true,
    },
    debug,
  });
}

/**
 * 根据钱包地址获取所有的 Collection
 * https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-nft-collections
 */
export function getWalletNFTCollections(walletAddress: string) {
  return requestApi({
    url: `${baseURL}/${walletAddress}/nft/collections`,
    method: 'get',
    debug,
  });
}

/**
 * 根据钱包地址获取所有的 NFT
 * https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-nfts
 */
export function getNFTByWalletAddress(walletAddress: string, chain = 'eth') {
  return requestApi({
    url: `${baseURL}/${walletAddress}/nft`,
    method: 'get',
    body: {
      chain: chain,
    },
    debug,
  });
}

/**
 * 搜索 NFT
 * https://deep-index.moralis.io/api/v2/nft/search
 */
export function searchNFT({
  keywords,
  chain = 'eth',
  filter,
  cursor,
  limit,
  contractAddress,
}: {
  keywords: string;
  chain?: string;
  filter?: string;
  cursor?: string;
  limit?: number;
  contractAddress: string;
}) {
  return requestApi({
    url: `${baseURL}/nft/search`,
    method: 'get',
    body: {
      chain,
      format: 'decimal',
      q: keywords,
      filter,
      cursor,
      limit,
      'addresses[0]': contractAddress,
    },
  });
}

/* ----------  alchemy api ↓↓↓  ---------- */

/**
 * 获取合约信息
 * https://docs.alchemy.com/reference/getcontractmetadata
 * https://eth-mainnet.g.alchemy.com/nft/v2/{apiKey}/getContractMetadata
 */
export function getContractMetadataSingle(contractAddress: string) {
  return requestApi({
    url: `${alchemy_base_url}/getContractMetadata`,
    method: 'get',
    body: {
      contractAddress,
    },
    debug,
  });
}

/**
 * 获取合约信息批量
 * https://docs.alchemy.com/reference/getcontractmetadatabatch
 * https://eth-mainnet.g.alchemy.com/nft/v2/{apiKey}/getcontractmetadatabatch
 */
export function getContractMetadataBatch(contractAddresses: string[]) {
  return requestApi({
    url: `${alchemy_base_url}/getContractMetadataBatch`,
    method: 'post',
    body: {
      contractAddresses,
    },
    debug,
  });
}
