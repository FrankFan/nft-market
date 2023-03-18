import { Link } from 'react-router-dom';

const rankList = [
  {
    name: 'mfers',
    contractAddress: '0x79fcdef22feed20eddacbb2587640e45491b757f',
  },
  {
    name: 'Bored Ape Yacht Club',
    contractAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  },
  {
    name: 'Azuki',
    contractAddress: '0xed5af388653567af2f388e6224dc7c4b3241c544',
  },
  {
    name: 'drunk robot',
    contractAddress: '0x2f073c4a897c615101fe4df00ea0869191c6fa8d',
  },
];

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
