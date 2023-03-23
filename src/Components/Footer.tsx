const github = `https://github.com/FrankFan/nft-market`;

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='copyleft'>
        <p>© NFT Market</p>
        <p>
          Data from OpenSea | With Alchemy API | Hosted on{' '}
          <a href={github} target='_blank'>
            Github
          </a>
        </p>
      </div>
    </div>
  );
};
