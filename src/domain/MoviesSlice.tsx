import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TheMovieDbConfig, Movie, Paginated, Filter } from "./types";

/**
 * Slice related to the movies data
 */

interface State {
  isConfigFetching: boolean;
  theMovieDbConfig?: TheMovieDbConfig;
  selectedFilter: Filter;
  areMoviesFetching: boolean;
  movies: { [id: string]: Paginated<Movie> };
  currentPage: number;
  totalPages?: number;
  fetchError?: string;
}

export const initialState: State = {
  selectedFilter: "popular",
  currentPage: 1,
  isConfigFetching: false,
  areMoviesFetching: false,
  movies: {}
};

export type PFetchMoviesSuccess = {
  movies: Movie[];
  page: number;
  totalPages: number;
};

export const slice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    initRequest: () => {
      // see how DataSaga handles it
    },
    fetchConfigRequest: state => {
      state.isConfigFetching = true;
      state.fetchError = undefined;
      state.theMovieDbConfig = undefined;
    },
    fetchConfigSuccess: (state, action: PayloadAction<TheMovieDbConfig>) => {
      state.isConfigFetching = false;
      state.theMovieDbConfig = action.payload;
    },
    fetchConfigError: (state, action: PayloadAction<string>) => {
      state.isConfigFetching = false;
      state.fetchError = action.payload;
    },
    fetchMoviesRequest: state => {
      state.areMoviesFetching = true;
      state.fetchError = undefined;
    },
    fetchMoviesSuccess: (state, action: PayloadAction<PFetchMoviesSuccess>) => {
      const { movies: stateMovies, page, totalPages } = action.payload;
      state.areMoviesFetching = false;
      state.totalPages = totalPages;
      const movies = stateMovies.reduce<{ [id: string]: Paginated<Movie> }>(
        (accumulator, movie, currentIndex) => ({
          ...accumulator,
          [movie.id]: { ...movie, page, indexInPage: currentIndex }
        }),
        {}
      );
      state.movies = { ...state.movies, ...movies };
    },
    fetchMoviesError: (state, action: PayloadAction<string>) => {
      state.areMoviesFetching = false;
      state.fetchError = action.payload;
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.selectedFilter = action.payload;
      state.movies = {};
      state.currentPage = 1;
    },
    nextPage: state => {
      state.currentPage += 1;
    }
  }
});

export const {
  initRequest,
  fetchConfigRequest,
  fetchConfigSuccess,
  fetchConfigError,
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesError,
  setFilter,
  nextPage
} = slice.actions;

export default slice.reducer;
