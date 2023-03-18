import { Link } from 'react-router-dom';
import { rankList } from '../../utils/rankingsDataSource';
import './index.scss';

export const Rankings = () => {
  return (
    <div className='rankings'>
      <h1>Ranking List</h1>
      <div className='rankings__content'>
        {rankList.map((item) => {
          return (
            <div key={item.name}>
              <Link to={`/collection/${item.contractAddress}`}>
                <img src={item.coverImg} alt='img' />
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
