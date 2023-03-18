import React from 'react';
import { Link } from 'react-router-dom';
import { NftCollectionItemType } from '../../types';
import { convertIpfs2Http } from '../../utils';

export const NFTCollectionItem = ({
  token_id,
  name,
  token_address,
  metadata,
}: NftCollectionItemType) => {
  const metadataObj = JSON.parse(metadata);
  const imgUrl = convertIpfs2Http(metadataObj.image);

  return (
    <Link to={`/assets/${token_address}/${token_id}`}>
      <div className='nft-collection-item'>
        <img src={imgUrl} alt={token_id} />
        <p>
          <span>{name}</span> #<span>{token_id}</span>
        </p>
      </div>
    </Link>
  );
};
