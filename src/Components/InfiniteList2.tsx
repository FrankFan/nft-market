import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Empty,
  Image,
  Input,
  List,
  message,
  Skeleton,
  Spin,
  Typography,
} from 'antd';
// import { FixedSizeList } from 'react-window';
// import InfiniteLoader from 'react-window-infinite-loader';
import VirtualList from 'rc-virtual-list';
import { getNftByCollection, searchNFT } from '../api';
import { NftCollectionItemType } from '../types';
import { convertIpfs2Http, logoUrl } from '../utils';
import { Link } from 'react-router-dom';

interface NFTItemType {
  name: string;
  imgUrl: string;
  tokenId: string;
  token_address: string;
  loading?: boolean;
}

const { Title } = Typography;

const ContainerHeight = 500;

const limit = 50;

const InfiniteList2 = ({ address }: { address: string }) => {
  const [data, setData] = useState<NFTItemType[]>([]);
  const [cursor, setCursor] = useState('');
  const [searchValue, setSeachValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    appendData();
    setInitLoading(false);
  }, []);

  const appendData = () => {
    setLoading(true);
    // loadmore
    // @ts-ignore
    setData(data.concat([...new Array(limit)].map(() => ({ loading: true }))));
    getNFTCollectionByContract(address, cursor).then((list) => {
      setData(data.concat(list));
      setLoading(false);
      message.success(`${list.length} more items loaded! `);
    });
  };

  const getNFTCollectionByContract = async (
    address: string,
    cursor: string
  ) => {
    const contractAddress = address;
    const chainId = 'eth';
    const { result, cursor: retCursor } = await getNftByCollection({
      contractAddress,
      chainId,
      limit,
      cursor,
    });
    setCursor(retCursor);

    const list: NFTItemType[] = result.map(
      (item: NftCollectionItemType, index: number) => {
        return {
          key: index,
          name: item.name,
          tokenId: item.token_id,
          token_address: item.token_address,
          imgUrl: convertIpfs2Http(item.normalized_metadata.image),
        };
      }
    );

    return list;
  };

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };

  const onSearch = async (value: string) => {
    if (!value) return;
    setLoading(true);
    try {
      const { result = [] } = await searchNFT({
        filter: 'global',
        keywords: value,
        limit: 20,
        contractAddress: address,
      });
      const list = result.map((item: any, index: number) => {
        const normalized_metadata = JSON.parse(item.metadata);
        return {
          name: normalized_metadata.name,
          imgUrl: convertIpfs2Http(normalized_metadata.image),
          tokenId: item.token_id,
          token_address: item.token_address,
        };
      });
      setData(list);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadMore = !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={appendData}>loading more</Button>
    </div>
  ) : null;

  return (
    <>
      <div className='my-serarch'>
        <Input.Search
          placeholder='search NFTs by tokenId'
          size='large'
          style={{ marginTop: 20 }}
          value={searchValue}
          loading={loading}
          enterButton
          onSearch={onSearch}
          onChange={(e) => setSeachValue(e.target.value)}
        />
      </div>
      <Title level={2}>藏品</Title>

      <List
        className='nft-list'
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
        loading={initLoading}
        loadMore={loadMore}
        dataSource={data}
        rowKey='tokenId'
        renderItem={(item) => (
          <Link to={`/assets/${item.token_address}/${item.tokenId}`}>
            <List.Item>
              <Card
                hoverable
                style={{ maxWidth: 250 }}
                cover={
                  item.loading ? (
                    <Skeleton.Image active />
                  ) : (
                    <Image
                      src={item.imgUrl}
                      fallback={logoUrl}
                      preview={false}
                    />
                  )
                }
              >
                <Skeleton loading={item.loading} paragraph={{ rows: 2 }} active>
                  <Card.Meta
                    title={item.name}
                    description={`#${item.tokenId}`}
                  ></Card.Meta>
                </Skeleton>
              </Card>
            </List.Item>
          </Link>
        )}
      ></List>
    </>
  );
};

export default InfiniteList2;
