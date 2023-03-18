import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/my'>my wallet</NavLink>
        </li>
        <li>
          <NavLink to='/rankings'>collection </NavLink>
        </li>
      </ul>
    </nav>
  );
};
