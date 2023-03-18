import { useParams } from 'react-router-dom';

export const AssetsDetail = () => {
  const { address, tokenId } = useParams();

  return (
    <div className='nft-detail'>
      <h1>nft detail</h1>
      <p>address = {address}</p>
      <p>tokenId = {tokenId}</p>
    </div>
  );
};
