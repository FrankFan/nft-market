import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContractMetadataSingle, getNftByCollection } from '../../api';
import { NftCollectionItemType, RankType } from '../../types';
import './index.scss';
import { BackButton } from '../../Components/BackButton';
import { Card, message, Spin, Typography } from 'antd';
import InfiniteList2 from '../../Components/InfiniteList2';

const { Title } = Typography;

export const NFTCollection = () => {
  const [collectionInfo, setCollectionInfo] = useState<RankType>();
  const { address } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      getCollectInfo(address).then((collection_info) => {
        setCollectionInfo(collection_info);
        setLoading(false);
      });
    }
  }, [address]);

  const getCollectInfo = async (contractAddress: string): Promise<RankType> => {
    const result = await getContractMetadataSingle(contractAddress);
    return result;
  };

  return (
    <div className='nft-collection'>
      <Spin spinning={loading}>
        <BackButton />
        <div className='nft-collection__info'>
          <Title level={2}>合集</Title>
          <Card title={collectionInfo?.contractMetadata.openSea.collectionName}>
            <p>
              <span className='bold'>认证状态: </span>
              {collectionInfo?.contractMetadata.openSea
                .safelistRequestStatus === 'verified'
                ? '✅'
                : ''}
            </p>
            <p>
              <span className='bold'>合约标准: </span>
              {collectionInfo?.contractMetadata.tokenType}
            </p>
            <p>
              <span className='bold'>symbol: </span>
              {collectionInfo?.contractMetadata.symbol}
            </p>
            <p>
              <span className='bold'>总供应量: </span>
              {collectionInfo?.contractMetadata.totalSupply}
            </p>
          </Card>
        </div>

        <div className='nft-collection-infinite-list'>
          <InfiniteList2 address={address as string} />
        </div>
      </Spin>
    </div>
  );
};
