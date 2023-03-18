import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className='navbar'>
      <NavLink className='logo' to='/'>
        <img
          src='https://opensea.io/static/images/favicon/180x180.png'
          alt='logo'
        />
      </NavLink>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/my'>My Wallet</NavLink>
        </li>
        {/* <li>
          <NavLink to='/rankings'>collection </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};
