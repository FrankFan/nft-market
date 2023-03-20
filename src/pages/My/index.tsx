import { useEffect, useState } from 'react';
import { getNFTByWalletAddress, getWalletNFTCollections } from '../../api';
import { Input, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';
import { convertIpfs2Http } from '../../utils';

interface displayDataType {
  token_address: string;
  contract_type: string;
  name: string;
  symbol: string;
}

interface MyNftItemDataType {
  amount: string;
  block_number: string;
  block_number_minted: string;
  contract_type: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: string;
  minter_address: string;
  name: string;
  owner_of: string;
  symbol: string;
  token_address: string;
  token_hash: string;
  token_id: string;
  token_uri: string;
}

const logoUrl = 'https://via.placeholder.com/260x260';
const myAddress = `0xa9Aa4613FAdA2287935CE5d6D375c28d248b5b50`;

export const My = () => {
  const [walletCollections, setWalletCollections] = useState({
    nftERC721: [],
    nftERC1155: [],
  });

  const [myNFT, setMyNFT] = useState<MyNftItemDataType[]>([]);

  const [loading, setLoading] = useState(false);
  const [searchValue, setSeachValue] = useState('');

  // useEffect(() => {
  //   getWalletNFTCollections(myAddress)
  //     .then((res) => {
  //       // 处理res
  //       const { result } = res;
  //       const nftERC1155 = result.filter(
  //         (item: displayDataType) => item.contract_type === 'ERC1155'
  //       );
  //       const nftERC721 = result.filter(
  //         (item: displayDataType) => item.contract_type === 'ERC721'
  //       );
  //       setWalletCollections({
  //         nftERC721,
  //         nftERC1155,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   getNFTByWalletAddress(myAddress)
  //     .then((res) => {
  //       const { result } = res;
  //       setMyNFT(result);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  // const items: TabsProps['items'] = walletCollections.nftERC721;

  const dom1155 = walletCollections.nftERC1155.map(
    (item: displayDataType, index) => {
      return (
        <Link key={index} to={`/my/collection/${item.token_address}`}>
          <div className='collection'>
            <img src={logoUrl} alt='logo' />
            <div className='collection_right'>
              <p>{item.name}</p>
              <p>{item.symbol}</p>
            </div>
          </div>
        </Link>
      );
    }
  );

  const dom721 = walletCollections.nftERC721.map(
    (item: displayDataType, index) => {
      return (
        <Link key={index} to={`/my/collection/${item.token_address}`}>
          <div className='collection'>
            <img src={logoUrl} alt='logo' />
            <div className='collection_right'>
              <p>{item.name}</p>
              <p>{item.symbol}</p>
            </div>
          </div>
        </Link>
      );
    }
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `ERC721`,
      children: dom721,
    },
    {
      key: '2',
      label: `ERC1155`,
      children: dom1155,
    },
  ];

  const renderMyNftItem = () => {
    return myNFT.map((nft) => {
      // console.log('---', nft.metadata, JSON.parse(nft.metadata));
      const { image } = JSON.parse(nft.metadata) || {};

      return (
        <div key={nft.token_id} className='nft-item'>
          <img
            src={convertIpfs2Http(image)}
            alt='nft'
            onError={(event: any) => {
              event.target.src = logoUrl;
              event.onError = null;
            }}
          />
          <div className='nft-item_right'>
            <p>
              {nft.name} #{nft.token_id}
            </p>
            <p>token_uri: {nft.token_uri}</p>
          </div>
        </div>
      );
    });
  };

  const onSearch = (value: string) => {
    if (value.length !== 42) return;
    setLoading(true);
    getNFTByWalletAddress(value)
      .then((res) => {
        setLoading(false);
        const { result } = res;
        setMyNFT(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='my'>
      <div className='my-serarch'>
        <Input.Search
          placeholder='input wallet address to search nft'
          size='large'
          value={searchValue}
          loading={loading}
          enterButton
          onSearch={onSearch}
          onChange={(e) => setSeachValue(e.target.value)}
        />
      </div>
      <h2>NFT total: {myNFT.length}</h2>
      <div className='my-nfts'>
        {/* <Tabs defaultActiveKey='1' items={items} onChange={onChange} /> */}
        {renderMyNftItem()}
      </div>
    </div>
  );
};
