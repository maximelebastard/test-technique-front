import lscache from "lscache";
import { ApiError } from "../domain/types";

const API_KEY = "962c182f72ce8d2c665cf08a1dc13394";
const CACHE_TTL_IN_MS = 3600000; // 1 hour

/**
 * Wraps an API result in a cache
 * @param key A unique key for cache
 * @param callback A Callback to compute the data
 */
async function withCache(key: string, callback: () => object) {
  if (!lscache.supported()) {
    console.warn("Local storage cache is not supported");
    return await callback();
  }

  lscache.flushExpired();

  const cached = lscache.get(key);
  if (cached) {
    console.debug(`Using cache for key ${key}`);
    return JSON.parse(cached);
  }

  const live = await callback();
  lscache.set(key, JSON.stringify(live), CACHE_TTL_IN_MS);
  return live;
}

/**
 * Authentication. Fetches a Request Token
 * @see https://developers.themoviedb.org/3/authentication/create-request-token
 */
export async function authRequestToken() {
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
  );
  if (res.status !== 200) {
    throw new ApiError("Invalid status");
  }
  return res.json();
}

type AuthSessionParams = {
  requestToken: string;
};
/**
 * Authentication. Fetches a Session ID.
 * @see https://developers.themoviedb.org/3/authentication/create-session
 * @param params
 */
export async function authSession(params: AuthSessionParams) {
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        request_token: params.requestToken // eslint-disable-line
      })
    }
  );
  if (res.status !== 200) {
    throw new ApiError("Invalid status");
  }
  return res.json();
}

type FetchAccountParams = {
  sessionId: string;
};
/**
 * Authentication. Fetches account data.
 * @see https://developers.themoviedb.org/3/account/get-account-details
 * @param params
 */
export async function fetchAccount(params: FetchAccountParams) {
  const res = await fetch(
    `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${params.sessionId}`
  );
  if (res.status !== 200) {
    throw new ApiError("Invalid status");
  }
  return res.json();
}

/**
 * Fetches the Movie DB latest configuration set.
 * @see https://developers.themoviedb.org/3/configuration/get-api-configuration
 * @param params
 */
export async function fetchConfig() {
  return withCache("themoviedb_config", async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    if (res.status !== 200) {
      throw new ApiError("Invalid status");
    }
    return res.json();
  });
}

export type FetchMoviesParams = {
  accountId: string;
  sessionId: string;
  page: number;
};
/**
 * Fetches the most popular movies of the week.
 * @see https://developers.themoviedb.org/3/trending/get-trending
 * @param params
 */
export async function fetchPopularMovies(params: FetchMoviesParams) {
  return withCache(`popular_page${params.page}`, async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${params.page}&per_page=15`
    );
    if (res.status !== 200) {
      throw new ApiError("Invalid status");
    }
    return res.json();
  });
}

/**
 * Fetches the lastest movies released.
 * @see https://developers.themoviedb.org/3/discover/movie-discover
 * @param params
 */
export async function fetchLatestMovies(params: FetchMoviesParams) {
  return withCache(`latest_page${params.page}`, async () => {
    const today = new Date().toISOString().split("T")[0];
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=release_date.desc&release_date.lte=${today}&page=${params.page}&per_page=15`
    );
    if (res.status !== 200) {
      throw new ApiError("Invalid status");
    }
    return res.json();
  });
}

/**
 * Fetches the movies in the user watchlist
 * @see https://developers.themoviedb.org/3/account/get-movie-watchlist
 * @param params
 */
export async function fetchWatchlistMovies(params: FetchMoviesParams) {
  const res = await fetch(
    `https://api.themoviedb.org/3/account/${params.accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${params.sessionId}&page=${params.page}&per_page=15`
  );
  if (res.status !== 200) {
    throw new ApiError("Invalid status");
  }
  return res.json();
}

type FetchMovieParams = {
  id: string;
};
/**
 * Fetches one movie detailed data.
 * @see https://developers.themoviedb.org/3/movies/get-movie-details
 * @param params
 */
export async function fetchMovie(params: FetchMovieParams) {
  return withCache(`movie_details_${params.id}`, async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&append_to_response=credits,recommendations`
    );
    return res.json();
  });
}

type FetchAccountStateParams = {
  sessionId: string;
  movieId: string;
};
/**
 * Fetches the Account State of a movie. It is the user specific data linked to a movie (rating, watchlist, etc.)
 * @see https://developers.themoviedb.org/3/movies/get-movie-account-states
 * @param params
 */
export async function fetchAccountState(params: FetchAccountStateParams) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieId}/account_states?api_key=${API_KEY}&session_id=${params.sessionId}`
  );
  return res.json();
}

type RateMovieParams = {
  sessionId: string;
  movieId: string;
  rating: number;
};
/**
 * Gives the user rate for a movie.
 * @see https://developers.themoviedb.org/3/movies/rate-movie
 * @param params
 */
export async function rateMovie(params: RateMovieParams) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieId}/rating?api_key=${API_KEY}&session_id=${params.sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        value: params.rating // eslint-disable-line
      })
    }
  );
  if (res.status !== 201) {
    throw new ApiError("Invalid status");
  }
  return res.json();
}

type AddToWatchlistParams = {
  sessionId: string;
  accountId: string;
  movieId: string;
  inWatchlist: boolean;
};
/**
 * Adds a movie in the user watchlist.
 * @see https://developers.themoviedb.org/3/account/add-to-watchlist
 * @param params
 */
export async function addToWatchlist(params: AddToWatchlistParams) {
  const res = await fetch(
    `https://api.themoviedb.org/3/account/${params.accountId}/watchlist?api_key=${API_KEY}&session_id=${params.sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        media_type: "movie", // eslint-disable-line
        media_id: params.movieId, // eslint-disable-line
        watchlist: params.inWatchlist // eslint-disable-line
      })
    }
  );
  if (res.status !== 201 && res.status !== 200) {
    throw new ApiError("Invalid status");
  }
  return res.json();
}
