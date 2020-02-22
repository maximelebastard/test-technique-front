import React from "react";
import styles from "./Error.module.scss";

const Error: React.FC = () => {
  return (
    <div className={styles.Error}>
      We&apos;re sorry, an error occured. Please check your internet connection
      and try again.
    </div>
  );
};

export default Error;
