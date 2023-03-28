import { Spin, Image } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNFTDetaildData } from '../../api';
import { BackButton } from '../../Components/BackButton';
import { convertIpfs2Http, truncateAddress } from '../../utils';
import './index.scss';

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

  useEffect(() => {
    getNFTDetaildData({
      contractAddress: address,
      tokenId,
    }).then((res) => {
      setDetail(res);
      setLoading(false);
    });
  }, []);

  if (!detail) return <></>;

  const { contract_type, owner_of } = detail;
  const { name, image, attributes, description } = detail.normalized_metadata;

  return (
    <div className='assets-detail'>
      <BackButton />
      <Spin spinning={loading} delay={500}>
        <h1 className='title'>{name}</h1>
        <div className='assets-detail__content'>
          <div className='img-wrapper'>
            <Image
              width={300}
              style={{ borderRadius: 20 }}
              src={convertIpfs2Http(image)}
            />
          </div>
          <div className='info'>
            <p>Type: {contract_type}</p>
            <p title={owner_of}>Owner: {truncateAddress(owner_of)}</p>
            <p>Description: {description}</p>
            <p></p>
            <pre>
              {Array.isArray(attributes) ? (
                attributes?.map((item, index) => (
                  <p key={index} className='attr'>
                    {JSON.stringify(item, null, 2)}
                  </p>
                ))
              ) : (
                <p>{JSON.stringify(attributes, null, 2)}</p>
              )}
            </pre>
          </div>
        </div>
      </Spin>
    </div>
  );
};
