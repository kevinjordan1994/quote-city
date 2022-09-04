import { NavLink } from "react-router-dom";
import styles from "../layout/MainNavigation.module.css";

export default function NavBar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Quote City</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/home" activeClassName={styles.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-quote" activeClassName={styles.active}>
              Add Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
