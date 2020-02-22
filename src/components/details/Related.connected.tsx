import React from "react";
import { Movie } from "domain/types";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Related from "./Related";

type RelatedConnectedProps = {
  movie: Movie;
};

const RelatedConnected: React.FC<RelatedConnectedProps> = props => {
  const { movie } = props;

  const movieDetails = useSelector(
    (state: RootState) => state.moviesDetails.moviesDetails[movie.id]
  );

  return <Related movies={movieDetails ? movieDetails.related : undefined} />;
};

export default RelatedConnected;
