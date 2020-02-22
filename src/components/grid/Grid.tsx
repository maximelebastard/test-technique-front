import React, { useEffect } from "react";
import styles from "./Grid.module.scss";
import Item from "./Item.connected";
import ItemPlaceholder from "./ItemPlaceholder";
import { Movie } from "domain/types";

type GridProps = {
  initializing: boolean;
  moviesFetching: boolean;
  movies: Movie[];
  totalPages?: number;
  currentPage?: number;
  onNextPage: () => void;
};

const Grid: React.FC<GridProps> = props => {
  const {
    initializing,
    movies,
    totalPages,
    currentPage,
    moviesFetching,
    onNextPage
  } = props;

  useEffect(
    function scrollToNextPage() {
      const isScrollAtBottom = () =>
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      const onScroll = () => {
        if (
          isScrollAtBottom() &&
          !moviesFetching &&
          currentPage &&
          totalPages &&
          currentPage < totalPages
        ) {
          onNextPage();
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    },
    [moviesFetching, totalPages, currentPage]
  );

  return (
    <ul className={styles.Grid}>
      {!initializing &&
        movies &&
        Object.values(movies).map(movie => {
          return <Item key={movie.id} movie={movie} />;
        })}
      {(moviesFetching || initializing) &&
        [0, 1, 2, 3, 4].map(i => (
          <ItemPlaceholder key={`item-placeholder-${i}`} />
        ))}
    </ul>
  );
};

export default Grid;
