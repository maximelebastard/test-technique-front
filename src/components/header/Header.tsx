import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>MovieStar</div>
    </header>
  );
};

export default Header;
