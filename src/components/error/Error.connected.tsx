import React from "react";
import Error from "./Error";
import { useSelector } from "react-redux";
import { RootState } from "store";

const ErrorConnected: React.FC = () => {
  const moviesFetchError = useSelector(
    (state: RootState) => state.movies.fetchError
  );
  const moviesDetailsFetchError = useSelector(
    (state: RootState) => state.moviesDetails.fetchError
  );
  return moviesFetchError || moviesDetailsFetchError ? <Error /> : null;
};

export default ErrorConnected;
