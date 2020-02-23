import React from "react";
import {
  addWatchlistRequest,
  removeWatchlistRequest,
  ratingRequest
} from "../../domain/MoviesDetailsSlice";
import { Movie } from "domain/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import Overview from "./Overview";

type OverviewConnectedProps = {
  movie: Movie;
};

const OverviewConnected: React.FC<OverviewConnectedProps> = props => {
  const { movie } = props;

  const dispatch = useDispatch();
  const movieDetails = useSelector(
    (state: RootState) => state.moviesDetails.moviesDetails[movie.id]
  );

  if (!movieDetails) {
    return <Overview title={movie.title} posterUrl={movie.poster} />;
  }

  return (
    <Overview
      title={movie.title}
      posterUrl={movie.poster}
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
