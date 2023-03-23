import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNftByCollection } from '../../api';
import { NftCollectionItemType } from '../../types';
import { NFTCollectionItem } from './NFTCollectoinItem';
import './index.scss';
import { BackButton } from '../../Components/BackButton';
import { Spin } from 'antd';

export const NFTCollection = () => {
  const [list, setList] = useState<NftCollectionItemType[]>([]);
  const { address } = useParams();
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };

  return (
    <div className='nft-collection'>
      <BackButton />
      <Spin spinning={loading}>
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
      </Spin>
    </div>
  );
};
