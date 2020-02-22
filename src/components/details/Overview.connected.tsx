import React from "react";
import {
  addWatchlistRequest,
  removeWatchlistRequest,
  ratingRequest
} from "../../domain/MoviesDetailsSlice";
import { Movie } from "domain/types";
import posterPlaceholder from "./poster-placeholder.jpg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import Overview from "./Overview";

type OverviewConnectedProps = {
  movie: Movie;
};

const OverviewConnected: React.FC<OverviewConnectedProps> = props => {
  const { movie } = props;

  const dispatch = useDispatch();
  const theMovieDbConfig = useSelector(
    (state: RootState) => state.movies.theMovieDbConfig
  );
  const movieDetails = useSelector(
    (state: RootState) => state.moviesDetails.moviesDetails[movie.id]
  );

  const posterUrl =
    theMovieDbConfig && movie.poster
      ? `${theMovieDbConfig.posterBaseUrl}${movie.poster}`
      : posterPlaceholder;

  if (!movieDetails) {
    return <Overview title={movie.title} posterUrl={posterUrl} />;
  }

  return (
    <Overview
      title={movie.title}
      posterUrl={posterUrl}
      directors={movieDetails.directors}
      genres={movieDetails.genres}
      rating={movieDetails.rating}
      totalRatings={movieDetails.totalRatings}
      userRating={movieDetails.userRating}
      synopsis={movieDetails.synopsis}
      inWatchlist={!!movieDetails.inWatchlist}
      onAddToWatchlist={() => dispatch(addWatchlistRequest({ id: movie.id }))}
      onRemoveFromWatchlist={() =>
        dispatch(removeWatchlistRequest({ id: movie.id }))
      }
      onRating={rating => dispatch(ratingRequest({ id: movie.id, rating }))}
    />
  );
};

export default OverviewConnected;
