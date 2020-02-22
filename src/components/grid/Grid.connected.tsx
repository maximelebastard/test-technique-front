import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import Grid from "./Grid";
import { nextPage } from "domain/MoviesSlice";

const GridConnected: React.FC = () => {
  const dispatch = useDispatch();
  const {
    areMoviesFetching,
    isConfigFetching,
    movies,
    currentPage,
    totalPages
  } = useSelector((state: RootState) => state.movies);

  const sortedMovies = Object.values(movies).sort(
    (a, b) => a.page - b.page || a.indexInPage - b.indexInPage
  );

  return (
    <Grid
      initializing={isConfigFetching}
      movies={sortedMovies}
      moviesFetching={areMoviesFetching}
      currentPage={currentPage}
      totalPages={totalPages}
      onNextPage={() => dispatch(nextPage())}
    />
  );
};

export default GridConnected;
