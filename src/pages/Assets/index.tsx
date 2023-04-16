import { Spin, Image, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContractMetadataSingle, getNFTDetaildData } from '../../api';
import { BackButton } from '../../Components/BackButton';
import { convertIpfs2Http, logoUrl, truncateAddress } from '../../utils';
import { AttributeCard } from './AttributeCard';
import './index.scss';
import { RankType } from '../../types';
import { marked } from 'marked';

const { Text, Title, Paragraph } = Typography;

type DetailType = {
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
  normalized_metadata: MetadataType;
};

type MetadataType = {
  name: string;
  description: string;
  image: string;
  external_link?: string;
  animation_url?: string;
  attributes?: [] | {};
  media?: object;
};

export const AssetsDetail = () => {
  const { address = '', tokenId = '' } = useParams();

  const [detail, setDetail] = useState<DetailType>();
  const [loading, setLoading] = useState(true);
  const [collectionInfo, setCollectionInfo] = useState<RankType>();

  useEffect(() => {
    getNFTDetaildData({
      contractAddress: address,
      tokenId,
    }).then((res) => {
      setDetail(res);
      setLoading(false);
    });
  }, []);

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

  if (!detail || !collectionInfo) return <></>;

  const { owner_of } = detail;
  const { attributes, image } = detail.normalized_metadata;

  const contractMetadata = collectionInfo?.contractMetadata;

  return (
    <div className='assets-detail'>
      <BackButton />
      <Spin spinning={loading} delay={500}>
        <h1 className='title'>
          {contractMetadata?.openSea?.collectionName}{' '}
          {collectionInfo?.contractMetadata?.openSea?.safelistRequestStatus ===
          'verified'
            ? '✅'
            : ''}
        </h1>
        <div className='assets-detail__content'>
          <Space size={32} align='start'>
            <Image
              width={400}
              style={{ borderRadius: 20 }}
              src={convertIpfs2Http(image)}
              fallback={logoUrl}
            />

            <Space direction='vertical'>
              <Paragraph>
                <div className='fw600 fs24 bold'>{contractMetadata?.name}</div>
              </Paragraph>

              <Paragraph>
                <div>
                  <span className='bold'>Type: </span>
                  {contractMetadata?.tokenType}
                </div>
              </Paragraph>

              <Paragraph copyable={{ text: tokenId }}>
                <span className='bold'>TokenId: </span>
                {tokenId}
              </Paragraph>

              <Paragraph>
                <div className='fs20'>
                  <span className='bold'>Symbol: </span>
                  {contractMetadata?.symbol}
                </div>
              </Paragraph>

              <Paragraph>
                <div>
                  <span className='bold'>totalSupply: </span>
                  {contractMetadata?.totalSupply}
                </div>
              </Paragraph>

              <Paragraph copyable={{ text: owner_of }}>
                <span className='bold'>Owner: </span>
                {truncateAddress(owner_of)}
              </Paragraph>

              <Paragraph>
                <div>
                  <span className='bold'>Description: </span>
                  <div
                    className='fs16'
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(
                        collectionInfo?.contractMetadata?.openSea?.description
                      ),
                    }}
                  ></div>
                </div>
              </Paragraph>

              {/* <Paragraph>{JSON.stringify(collectionInfo)}</Paragraph> */}
            </Space>
          </Space>
        </div>
        <div className='assets-detail__attributes'>
          <Title level={2}>Attributes</Title>
          <Space size='middle' wrap>
            {Array.isArray(attributes) ? (
              attributes?.map((item, index) => (
                <AttributeCard key={index} {...item} />
              ))
            ) : (
              <p>{JSON.stringify(attributes, null, 2)}</p>
            )}
          </Space>
        </div>
      </Spin>
    </div>
  );
};
