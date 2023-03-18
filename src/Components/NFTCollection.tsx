import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNftByCollection } from '../api';
import { NFTCollectionItem } from './NFTCollectoinItem';

export interface NftCollectionType {
  nftImg: string;
  tokenId: string;
  contract_type: string;
  name: string;
  symbol: string;
}

interface NftCollectionItemType {
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

// interface IPros {
//   address?: string;
// }

export const NFTCollection = () => {
  const [list, setList] = useState<NftCollectionType[]>([]);
  const { address } = useParams();
  console.log('address ---', address);

  useEffect(() => {
    console.log('useEffect');
    getNFTCollectionByContract();
  }, []);

  const getNFTCollectionByContract = async () => {
    if (!address) return [];
    console.log(`-------- address = `, address);
    const contractAddress = address;
    const chainId = 'eth';
    const limit = 100;
    const { result, page, page_size, total } = await getNftByCollection({
      contractAddress,
      chainId,
      limit,
    });
    console.log(result);

    const displayList: NftCollectionType[] = result.map(
      (item: NftCollectionItemType) => {
        return {
          tokenId: item.token_id,
          contractType: item.contract_type,
          name: item.name,
          symbol: item.symbol,
          nftImg: convertIpfs2Http(JSON.parse(item.metadata).image),
        };
      }
    );

    setList(displayList);
  };

  const convertIpfs2Http = (metadataImage: string) => {
    // "ipfs://QmR2cwTitB7UfdDBz9fmJkGgwoRNSoZTZ6ZbttiCQV1Z99"
    if (metadataImage.startsWith('ipfs://')) {
      const CID = metadataImage.split('//')[1];
      const gateway = `https://ipfs.io/ipfs/${CID}`;
      return gateway;
    } else {
      return metadataImage;
    }
  };

  return (
    <div className='nft-collection'>
      <h1>nft collection</h1>
      <div className='nft-collection__content'>
        {list.map((item) => (
          <NFTCollectionItem key={item.tokenId} {...item} />
        ))}
      </div>
    </div>
  );
};
