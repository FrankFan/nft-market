import { NftCollectionType } from './NFTCollection';

export const NFTCollectionItem = ({
  nftImg,
  tokenId,
  name,
}: NftCollectionType) => {
  return (
    <div className='nft-collection-item'>
      <img src={nftImg} alt='img' />
      <p>
        {name} #{tokenId}
      </p>
    </div>
  );
};
