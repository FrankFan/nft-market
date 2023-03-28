/**
 * 将ipfs协议转化为http协议
 * @param metadataImage ipfs开头的地址
 * @returns http地址
 */
export const convertIpfs2Http = (metadataImage: string | undefined) => {
  // "ipfs://QmR2cwTitB7UfdDBz9fmJkGgwoRNSoZTZ6ZbttiCQV1Z99"
  if (!metadataImage) return;
  if (metadataImage.startsWith('ipfs://')) {
    const CID = metadataImage.split('//')[1];
    const gateway = `https://ipfs.io/ipfs/${CID}`;
    return gateway;
  } else {
    return metadataImage;
  }
};

/**
 * 格式化以太坊地址，前4后4
 */
export const truncateAddress = (address: string) => {
  if (!address) return 'No Account';
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

/**
 * 占位图
 */
export const logoUrl = 'https://via.placeholder.com/260x260';
