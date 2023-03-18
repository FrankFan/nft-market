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
  contractAddress: number;
  tokenId: number;
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
 * 获取nft详情数据
 */
export function getRewardData({ contractAddress, tokenId }: NftDetailType) {
  return requestApi({
    url: `${baseURL}/nft/${contractAddress}/${tokenId}`,
    method: 'get',
    debug,
  });
}
