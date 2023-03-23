import { requestApi } from './requestApi';

const debug = false;

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const baseURL = `${API_DOMAIN}`;

type NftCollectionType = {
  contractAddress: string;
  chainId: string;
  limit?: number;
};

export interface NftDetailType {
  contractAddress: string;
  tokenId: string;
}

/**
 * 获取 nft 合集数据内容
 */
export function getNftByCollection({
  contractAddress,
  chainId,
  limit,
}: NftCollectionType) {
  return requestApi({
    url: `${baseURL}/nft/${contractAddress}`,
    method: 'get',
    body: {
      chainId,
      limit,
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
export function getNFTByWalletAddress(walletAddress: string, chain = '') {
  return requestApi({
    url: `${baseURL}/${walletAddress}/nft`,
    method: 'get',
    body: {
      chain: chain,
    },
    debug,
  });
}
