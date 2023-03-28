import React from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
// @ts-ignore
const InfiniteList = ({ items, moreItemsLoading, loadMore, hasNextPage }) => {
  /* define the row component using items[index] */
  // @ts-ignore
  const renderRow = ({ index, style }) => {
    const { name, token_id, imgUrl } = items[index] || {};
    return (
      <div className='item'>
        <img src={imgUrl} alt='' />
        <p>{name}</p>
        <p>{token_id}</p>
      </div>
    );
  };

  const itemCount = hasNextPage ? items.length + 1 : items.length;

  return (
    <InfiniteLoader
      isItemLoaded={(index) => index < items.length}
      itemCount={itemCount}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          className='infiniteList'
          height={500}
          width={500}
          itemCount={itemCount}
          itemSize={100}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteList;
