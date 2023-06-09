import { Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getContractMetadataBatch } from '../../api';
import { RankListType } from '../../types';
import { rankList } from '../../utils/rankingsDataSource';
import './index.scss';
import { RankItem } from './RankItem';

const { Title } = Typography;

export const Rankings = () => {
  const [ranks, setRanks] = useState<RankListType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankingListInfo();
  }, []);

  const fetchRankingListInfo = async () => {
    const rankingList = rankList.map((item) => item.contractAddress);
    try {
      const list = await getContractMetadataBatch(rankingList);
      setRanks(list);
      setLoading(false);
    } catch (error) {
      console.log('getContractMetadataBatch error', error);
    }
  };

  return (
    <div className='rankings'>
      <Spin spinning={loading}>
        <Title level={2}>Ranking List</Title>
        <div className='rankings__body'>
          {ranks &&
            ranks.map((item) => <RankItem key={item.address} {...item} />)}
        </div>
      </Spin>
    </div>
  );
};
