import React from 'react';
import { Link } from 'react-router-dom';
import { NftCollectionItemType } from '../../types';
import { convertIpfs2Http, logoUrl } from '../../utils';

export const NFTCollectionItem = ({
  token_id,
  name,
  token_address,
  normalized_metadata,
}: NftCollectionItemType) => {
  const imgUrl = convertIpfs2Http(normalized_metadata.image);

  return (
    <Link to={`/assets/${token_address}/${token_id}`}>
      <div className='nft-collection-item'>
        <img
          src={imgUrl}
          alt=''
          onError={(event: any) => {
            event.target.src = logoUrl;
            event.onError = null;
          }}
        />
        <p>
          <span>{name}</span> #<span>{token_id}</span>
        </p>
      </div>
    </Link>
  );
};
