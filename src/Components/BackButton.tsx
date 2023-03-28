import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className='back-button'>
      <span onClick={() => navigate(-1)}>⏪</span>
    </div>
  );
};
