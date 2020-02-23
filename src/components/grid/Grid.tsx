import React, { useEffect } from "react";
import styles from "./Grid.module.scss";
import Item from "./Item";
import ItemPlaceholder from "./ItemPlaceholder";
import { Movie } from "domain/types";

type GridProps = {
  initializing: boolean;
  moviesFetching: boolean;
  movies: Movie[];
  totalPages?: number;
  currentPage?: number;
  selectedMovieId?: string;
  onNextPage: () => void;
  onItemSelected: (movieId: string | undefined) => void;
};

const Grid: React.FC<GridProps> = props => {
  const {
    initializing,
    movies,
    totalPages,
    currentPage,
    moviesFetching,
    selectedMovieId,
    onNextPage,
    onItemSelected
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
          return (
            <Item
              key={movie.id}
              movie={movie}
              onMovieSelected={movieId => onItemSelected(movieId)}
              showDetails={selectedMovieId === movie.id}
            />
          );
        })}
      {(moviesFetching || initializing) &&
        [0, 1, 2, 3, 4].map(i => (
          <ItemPlaceholder key={`item-placeholder-${i}`} />
        ))}
    </ul>
  );
};

export default Grid;
