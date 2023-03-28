import React, { useEffect, useState } from 'react';
import { Image, List, message, Tooltip } from 'antd';
// import { FixedSizeList } from 'react-window';
// import InfiniteLoader from 'react-window-infinite-loader';
import VirtualList from 'rc-virtual-list';
import { getNftByCollection } from '../api';
import { NftCollectionItemType } from '../types';
import { convertIpfs2Http } from '../utils';
import { Link } from 'react-router-dom';

interface NFTItemType {
  name: string;
  imgUrl: string;
  tokenId: string;
  token_address: string;
}

const ContainerHeight = 500;

const InfiniteList2 = ({ address }: { address: string }) => {
  const [data, setData] = useState<NFTItemType[]>([]);
  const [cursor, setCursor] = useState('');

  useEffect(() => {
    appendData();
  }, []);

  const appendData = () => {
    getNFTCollectionByContract(address, cursor).then((list) => {
      setData(data.concat(list));
      message.success(`${list.length} more items loaded! `);
    });
  };

  const getNFTCollectionByContract = async (
    address: string,
    cursor: string
  ) => {
    const contractAddress = address;
    const chainId = 'eth';
    const limit = 50;
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

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey='tokenId'
        onScroll={onScroll}
      >
        {(item: NFTItemType) => (
          <List.Item
            key={item.tokenId}
            actions={[
              <a
                key='list-go'
                href={`https://opensea.io/assets/ethereum/${item.token_address}`}
                target={'_blank'}
              >
                OpenSea
              </a>,
              <a
                key='list-edit'
                href={`https://blur.io/asset/${item.token_address}/${item.tokenId}`}
                target={'_blank'}
              >
                Blur.io
              </a>,
              <Link to={`/assets/${item.token_address}/${item.tokenId}`}>
                详情
              </Link>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Image
                  width={100}
                  style={{ borderRadius: 20 }}
                  src={item.imgUrl}
                />
              }
              title={`#${item.tokenId}`}
            />
            <div className='nft-item-name'>{item.name}</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default InfiniteList2;
