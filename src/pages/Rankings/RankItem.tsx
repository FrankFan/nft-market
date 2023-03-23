import { Link } from 'react-router-dom';
import { RankType } from '../../types';
import { logoUrl } from '../../utils';
import './index.scss';

export const RankItem = ({ address, contractMetadata }: RankType) => {
  const { openSea, name: collectionName } = contractMetadata;
  const { floorPrice, safelistRequestStatus, imageUrl = logoUrl } = openSea;
  return (
    <div className='rank-item'>
      <Link to={`/collection/${address}`}>
        <div className='rank-item__content'>
          <img
            src={imageUrl}
            alt='img'
            onError={(event: any) => {
              event.target.src = logoUrl;
              event.onError = null;
            }}
          />
          <div className='name'>
            {collectionName}
            <span>{safelistRequestStatus ? '✅' : '❌'}</span>
          </div>
          <div className='floor'>{floorPrice}Ξ</div>
        </div>
      </Link>
    </div>
  );
};
