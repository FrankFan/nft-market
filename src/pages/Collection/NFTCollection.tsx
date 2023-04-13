import { useParams } from 'react-router-dom';
import './index.scss';
import { BackButton } from '../../Components/BackButton';
import InfiniteList2 from '../../Components/InfiniteList2';

export const NFTCollection = () => {
  const { address } = useParams();

  return (
    <div className='nft-collection'>
      <BackButton />
      <InfiniteList2 address={address as string} />
    </div>
  );
};
