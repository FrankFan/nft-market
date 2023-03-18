import { Link } from 'react-router-dom';
import { rankList } from '../../utils/rankingsDataSource';

export const Rankings = () => {
  return (
    <div className='list'>
      <h1>collection list</h1>

      <ul>
        {rankList.map((item) => {
          return (
            <li key={item.name}>
              <Link to={`/collection/${item.contractAddress}`}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
