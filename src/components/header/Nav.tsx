import { NavLink } from 'react-router-dom';
import Styles from './header.module.scss';

const Nav = () => {
  return (
    <ul className={Styles.ul}>
      <li>
        <NavLink activeStyle={{ borderColor: "#679ACB", color: "#679ACB" }} className={Styles.link} exact  to="/">
          Browse beers
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={{ borderColor: "#679ACB", color: "#679ACB" }} className={Styles.link} to="/favorite">
          Favorite beers
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
