import { useParams } from 'react-router';

export const MyCollection = () => {
  const { address } = useParams();

  return (
    <div className='my-collection'>
      <p>address: {address}</p>
    </div>
  );
};
