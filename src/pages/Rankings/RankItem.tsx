import { Link } from 'react-router-dom';
import { RankType } from '../../types';
import './index.scss';

export const RankItem = ({ address, contractMetadata }: RankType) => {
  const { openSea } = contractMetadata;
  const { collectionName, floorPrice, safelistRequestStatus, imageUrl } =
    openSea;
  return (
    <div className='rank-item'>
      <Link to={`/collection/${address}`}>
        <div className='rank-item__content'>
          <img src={imageUrl} alt='img' />
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
