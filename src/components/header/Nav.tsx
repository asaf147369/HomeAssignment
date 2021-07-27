import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { State } from '../../interfaces/state';
import Styles from './header.module.scss';

const Nav = () => {

  const favorites = useSelector((state: State) => state.favorites);

  return (
    <ul className={Styles.ul}>
      <li>
        <NavLink activeStyle={{ borderColor: "#679ACB", color: "#679ACB" }} className={Styles.link} exact  to="/">
          Browse beers
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={{ borderColor: "#679ACB", color: "#679ACB" }} className={Styles.link} to="/favorite">
          Favorite beers {favorites.length ? `(${favorites.length})` : ""}
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
