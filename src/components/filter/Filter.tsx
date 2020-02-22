import React from "react";
import styles from "./Filter.module.scss";
import { Filter as FilterType } from "../../domain/types";

type FilterProps = {
  selected: FilterType;
  onChange: (filter: FilterType) => {};
};

const Filter: React.FC<FilterProps> = props => {
  return (
    <div className={styles.Filter}>
      <select
        className={styles.select}
        onChange={e => props.onChange(e.target.value as FilterType)}
        value={props.selected}
      >
        <option value="popular">Popular</option>
        <option value="latest">Latest releases</option>
        <option value="watchlist">My watchlist</option>
      </select>
    </div>
  );
};

export default Filter;
