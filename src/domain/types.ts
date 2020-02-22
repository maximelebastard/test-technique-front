export class ApiError extends Error {}

export type Filter = "popular" | "latest" | "watchlist";

export interface Movie {
  id: string;
  title: string;
  poster?: string;
}

export interface MovieDetails {
  id: string;
  genres?: string[];
  directors?: string[];
  rating?: number;
  totalRatings?: number;
  userRating?: number;
  synopsis?: string;
  related?: Movie[];
  inWatchlist?: boolean;
}

export interface TheMovieDbConfig {
  posterBaseUrl: string;
}

export type Paginated<T> = T & {
  page: number;
  indexInPage: number;
};
