import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import posterPlaceholder from "./poster-placeholder.jpg";
import Thumbnail from "./Thumbnail";
import { Movie } from "domain/types";

type ThumbnailConnectedProps = {
  movie: Movie;
  onClick?: () => void;
};

const ThumbnailConnected: React.FC<ThumbnailConnectedProps> = props => {
  const { movie, onClick } = props;

  const theMovieDbConfig = useSelector(
    (state: RootState) => state.movies.theMovieDbConfig
  );
  const { selectedMovieId } = useSelector((state: RootState) => state.grid);

  const posterUrl =
    theMovieDbConfig && movie.poster
      ? `${theMovieDbConfig.posterBaseUrl}${movie.poster}`
      : posterPlaceholder;

  return (
    <Thumbnail
      title={movie.title}
      selected={movie.id === selectedMovieId}
      posterUrl={posterUrl}
      onClick={onClick}
    />
  );
};

export default ThumbnailConnected;
