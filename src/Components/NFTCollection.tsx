import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNftByCollection } from '../api';
import { NftCollectionItemType } from '../types';
import { NFTCollectionItem } from './NFTCollectoinItem';

// export interface NftCollectionType {
//   token_id: string;
//   contract_type: string;
//   token_address: string;
//   name: string;
//   symbol: string;
//   metadata: string;
// }

export const NFTCollection = () => {
  const [list, setList] = useState<NftCollectionItemType[]>([]);
  const { address } = useParams();

  useEffect(() => {
    getNFTCollectionByContract();
  }, []);

  const getNFTCollectionByContract = async () => {
    if (!address) return [];

    const contractAddress = address;
    const chainId = 'eth';
    const limit = 20;
    const { result, page, page_size, total } = await getNftByCollection({
      contractAddress,
      chainId,
      limit,
    });
    setList(result);
  };

  return (
    <div className='nft-collection'>
      {list.length > 0 ? (
        <div className='nft-collection__info'>
          <h1>{list[0].name}</h1>
          <p>Contract Type: {list[0].contract_type}</p>
          <p>symbol: {list[0].symbol}</p>
        </div>
      ) : null}
      <div className='nft-collection__content'>
        {list.map((item) => (
          <NFTCollectionItem key={item.token_id} {...item} />
        ))}
      </div>
    </div>
  );
};
