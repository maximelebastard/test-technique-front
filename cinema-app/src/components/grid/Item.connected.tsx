import React from "react";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { Movie } from "domain/types";
import { showMovieDetails } from "domain/GridSlice";

type ItemConnectedProps = {
  movie: Movie;
};

const ItemConnected: React.FC<ItemConnectedProps> = props => {
  const dispatch = useDispatch();
  const { selectedMovieId } = useSelector((state: RootState) => state.grid);

  return (
    <Item
      movie={props.movie}
      onMovieSelected={movieId => dispatch(showMovieDetails(movieId))}
      showDetails={props.movie.id === selectedMovieId}
    />
  );
};

export default ItemConnected;
