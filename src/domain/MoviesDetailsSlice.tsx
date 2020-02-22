import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieDetails } from "./types";

/**
 * Slice related to the movies details data
 */

interface State {
  isConfigFetching: boolean;
  moviesDetails: { [id: string]: MovieDetails };
  fetchingMoviesIds: { [id: string]: boolean };
  fetchError?: string;
}

export const initialState: State = {
  isConfigFetching: false,
  moviesDetails: {},
  fetchingMoviesIds: {}
};

export type PFetchMovieDetailsRequest = {
  id: string;
};
export type PFetchMovieDetailsSuccess = {
  id: string;
  genres: string[];
  directors: string[];
  rating: number;
  totalRatings: number;
  userRating?: number;
  synopsis: string;
  related: Movie[];
  inWatchlist: boolean;
};
export type PFetchMovieDetailsError = PFetchMovieDetailsRequest & {
  error: string;
};

export type PAddWatchlist = {
  id: string;
};
export type PAddWatchlistError = PAddWatchlist & {
  error: string;
};

export type PRateMovie = {
  id: string;
  rating: number;
};
export type PRateMovieError = PRateMovie & {
  error: string;
};

export const slice = createSlice({
  name: "movies_details",
  initialState,
  reducers: {
    fetchMovieDetailsRequest: (
      state,
      action: PayloadAction<PFetchMovieDetailsRequest>
    ) => {
      state.fetchingMoviesIds[action.payload.id] = true;
      state.fetchError = undefined;
    },
    fetchMovieDetailsSuccess: (
      state,
      action: PayloadAction<PFetchMovieDetailsSuccess>
    ) => {
      delete state.fetchingMoviesIds[action.payload.id];
      state.moviesDetails[action.payload.id] = {
        ...state.moviesDetails[action.payload.id],
        directors: action.payload.directors,
        genres: action.payload.genres,
        rating: action.payload.rating,
        totalRatings: action.payload.totalRatings,
        userRating: action.payload.userRating,
        related: action.payload.related,
        synopsis: action.payload.synopsis,
        inWatchlist: action.payload.inWatchlist
      };
      state.fetchError = undefined;
    },
    fetchMovieDetailsError: (
      state,
      action: PayloadAction<PFetchMovieDetailsError>
    ) => {
      delete state.fetchingMoviesIds[action.payload.id];
      state.fetchError = action.payload.error;
    },
    addWatchlistRequest: (state, action: PayloadAction<PAddWatchlist>) => {
      state.moviesDetails[action.payload.id] = {
        ...state.moviesDetails[action.payload.id],
        inWatchlist: true
      };
      state.fetchError = undefined;
    },
    addWatchlistSuccess: state => {
      state.fetchError = undefined;
    },
    addWatchlistError: (state, action: PayloadAction<PAddWatchlistError>) => {
      state.moviesDetails[action.payload.id] = {
        ...state.moviesDetails[action.payload.id],
        inWatchlist: false
      };
      state.fetchError = action.payload.error;
    },
    removeWatchlistRequest: (state, action: PayloadAction<PAddWatchlist>) => {
      state.moviesDetails[action.payload.id] = {
        ...state.moviesDetails[action.payload.id],
        inWatchlist: false
      };
      state.fetchError = undefined;
    },
    removeWatchlistSuccess: state => {
      state.fetchError = undefined;
    },
    removeWatchlistError: (
      state,
      action: PayloadAction<PAddWatchlistError>
    ) => {
      state.moviesDetails[action.payload.id] = {
        ...state.moviesDetails[action.payload.id],
        inWatchlist: true
      };
      state.fetchError = action.payload.error;
    },
    ratingRequest: (state, action: PayloadAction<PRateMovie>) => {
      state.moviesDetails[action.payload.id] = {
        ...state.moviesDetails[action.payload.id],
        userRating: action.payload.rating
      };
      state.fetchError = undefined;
    },
    ratingSuccess: (state, action: PayloadAction<PRateMovie>) => {
      state.moviesDetails[action.payload.id] = {
        ...state.moviesDetails[action.payload.id],
        userRating: action.payload.rating
      };
      state.fetchError = undefined;
    },
    ratingError: (state, action: PayloadAction<PRateMovieError>) => {
      state.moviesDetails[action.payload.id] = {
        ...state.moviesDetails[action.payload.id],
        userRating: undefined
      };
      state.fetchError = action.payload.error;
    }
  }
});

export const {
  fetchMovieDetailsRequest,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsError,
  addWatchlistRequest,
  addWatchlistSuccess,
  addWatchlistError,
  removeWatchlistRequest,
  removeWatchlistSuccess,
  removeWatchlistError,
  ratingRequest,
  ratingSuccess,
  ratingError
} = slice.actions;

export default slice.reducer;
