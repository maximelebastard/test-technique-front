import React from "react";
import styles from "./Related.module.scss";
import { Movie } from "domain/types";
import Thumbnail from "components/thumbnail/Thumbnail";

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
            <Thumbnail
              selected={false}
              title={movie.title}
              posterUrl={movie.poster}
            />
          </div>
        ))}
    </div>
  );
};

export default Related;
