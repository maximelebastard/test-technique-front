import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Grid.module.scss";

const ItemPlaceholder: React.FC = () => (
  <li className={styles.item}>
    <ContentLoader
      speed={2}
      width={190}
      height={326}
      viewBox="0 0 190 326"
      backgroundColor="#2e2e2e"
      foregroundColor="#363636"
    >
      <rect x="0" y="316" rx="5" ry="5" width="150" height="10" />
      <rect x="0" y="0" rx="3" ry="5" width="190" height="282" />
    </ContentLoader>
  </li>
);

export default ItemPlaceholder;
