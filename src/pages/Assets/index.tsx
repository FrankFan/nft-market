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
};

export const AssetsDetail = () => {
  const { address = '', tokenId = '' } = useParams();

  const [detail, setDetail] = useState<DetailType>();

  useEffect(() => {
    getNFTDetaildData({
      contractAddress: address,
      tokenId,
    }).then((res) => {
      console.log(res);
      setDetail(res);
    });
  }, []);

  if (!detail) return <></>;

  return (
    <div className='assets-detail'>
      <BackButton />
      <h1 className='title'>
        {detail?.name}#{detail?.token_id}
      </h1>
      <div className='assets-detail__content'>
        <img
          src={convertIpfs2Http(JSON.parse(detail?.metadata).image)}
          alt='img'
        />
        <div className='info'>
          <p>Type: {detail?.contract_type}</p>
          <p title={detail.owner_of}>
            Owner: {truncateAddress(detail?.owner_of)}
          </p>
        </div>
      </div>
    </div>
  );
};
