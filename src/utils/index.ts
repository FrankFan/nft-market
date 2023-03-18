export const convertIpfs2Http = (metadataImage: string) => {
  // "ipfs://QmR2cwTitB7UfdDBz9fmJkGgwoRNSoZTZ6ZbttiCQV1Z99"
  if (metadataImage.startsWith('ipfs://')) {
    const CID = metadataImage.split('//')[1];
    const gateway = `https://ipfs.io/ipfs/${CID}`;
    return gateway;
  } else {
    return metadataImage;
  }
};
