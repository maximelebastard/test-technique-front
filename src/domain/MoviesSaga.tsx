import { call, put, take, takeLatest, select } from "redux-saga/effects";
import * as MoviesSlice from "./MoviesSlice";
import * as Api from "../api/theMovieDb";
import { RootState } from "store";
import { Movie, Filter } from "./types";

function* fetchConfig() {
  try {
    const data = yield call(Api.fetchConfig);
    yield put(
      MoviesSlice.fetchConfigSuccess({
        posterBaseUrl: `${data.images.secure_base_url}${data.images.poster_sizes[3]}`
      })
    );
  } catch (e) {
    console.error(e);
    yield put(MoviesSlice.fetchConfigError(e));
  }
}

function* fetchMovies() {
  const page = yield select((state: RootState) => state.movies.currentPage);
  const selectedFilter: Filter = yield select(
    (state: RootState) => state.movies.selectedFilter
  );
  const { sessionId, accountId } = yield select(
    (state: RootState) => state.user
  );

  const endpointFromFilter: {
    [filter in Filter]: (p: Api.FetchMoviesParams) => Promise<any>;
  } = {
    popular: Api.fetchPopularMovies,
    latest: Api.fetchLatestMovies,
    watchlist: Api.fetchWatchlistMovies
  };

  try {
    const data = yield call(endpointFromFilter[selectedFilter], {
      page,
      sessionId,
      accountId
    });
    const movies = data.results.map(
      (result: any): Movie => ({
        id: result.id,
        title: result.title,
        poster: result.poster_path
      })
    );
    yield put(
      MoviesSlice.fetchMoviesSuccess({
        page,
        movies,
        totalPages: data.total_pages
      })
    );
  } catch (e) {
    console.error(e);
    yield put(MoviesSlice.fetchMoviesError(e.toString()));
  }
}

function* initializeApp() {
  yield put(MoviesSlice.fetchConfigRequest());
  yield take(MoviesSlice.fetchConfigSuccess.type);
  yield put(MoviesSlice.fetchMoviesRequest());
}

function* handleFilterChange() {
  yield put(MoviesSlice.fetchMoviesRequest());
}

function* fetchNextPage() {
  yield put(MoviesSlice.fetchMoviesRequest());
}

function* MoviesSaga() {
  yield takeLatest(MoviesSlice.initRequest.type, initializeApp);
  yield takeLatest(MoviesSlice.setFilter.type, handleFilterChange);
  yield takeLatest(MoviesSlice.fetchConfigRequest.type, fetchConfig);
  yield takeLatest(MoviesSlice.fetchMoviesRequest.type, fetchMovies);
  yield takeLatest(MoviesSlice.nextPage.type, fetchNextPage);
}

export default MoviesSaga;
