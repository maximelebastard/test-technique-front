import React from "react";
import styles from "./Related.module.scss";
import { Movie } from "domain/types";
import Thumbnail from "components/thumbnail/Thumbnail.connected";

type RelatedProps = {
  movies?: Movie[];
};

const Related: React.FC<RelatedProps> = props => {
  const { movies } = props;

  return (
    <div className={styles.Related}>
      {movies &&
        movies.map(movie => (
          <div key={movie.id} className={styles.item}>
            <Thumbnail movie={movie} />
          </div>
        ))}
    </div>
  );
};

export default Related;
