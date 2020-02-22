import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../domain/MoviesSlice";
import Filter from "./Filter";
import { RootState } from "store";

const FilterConnected: React.FC = () => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.movies.selectedFilter
  );

  return (
    <Filter
      selected={selected}
      onChange={selected => dispatch(setFilter(selected))}
    />
  );
};

export default FilterConnected;
