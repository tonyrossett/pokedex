import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ThemeTogglerButton } from "../ThemeTogglerButton/themetogglerbutton";
import pokeLogo from "../../images/Pokemon.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <Link to="/">
          <img src={pokeLogo} alt="Pokemon Logo" />
        </Link>
        <ThemeTogglerButton />
      </nav>
    </header>
  );
};

export default Header;
