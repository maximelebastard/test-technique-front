import {
  call,
  put,
  all,
  takeLatest,
  takeEvery,
  select
} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import * as MoviesDetailsSlice from "./MoviesDetailsSlice";
import * as Api from "../api/theMovieDb";
import { RootState } from "store";
import * as GridSlice from "./GridSlice";

function* fetchMovieDetails(
  action: PayloadAction<MoviesDetailsSlice.PFetchMovieDetailsRequest>
) {
  try {
    const sessionId = yield select((state: RootState) => state.user.sessionId);

    const data = yield all([
      call(Api.fetchMovie, { id: action.payload.id }),
      call(Api.fetchAccountState, { movieId: action.payload.id, sessionId })
    ]);

    const directors = data[0].credits.crew
      .filter((crewMember: any) => crewMember.job === "Director")
      .map((crewMember: any) => crewMember.name);

    yield put(
      MoviesDetailsSlice.fetchMovieDetailsSuccess({
        id: action.payload.id,
        directors: directors.length > 0 ? directors : undefined,
        genres:
          data[0].genres.length > 0
            ? data[0].genres.map((genre: any) => genre.name)
            : undefined,
        synopsis: data[0].overview,
        rating: data[0].vote_average,
        totalRatings: data[0].vote_count,
        userRating: data[1].rated != "false" ? data[1].rated.value : undefined,
        inWatchlist: data[1].watchlist,
        related: data[0].recommendations.results
          .slice(0, 5)
          .map((reco: any) => ({
            id: reco.id,
            title: reco.title,
            poster: reco.poster_path
          }))
      })
    );
  } catch (e) {
    console.error(e);
    yield put(
      MoviesDetailsSlice.fetchMovieDetailsError({
        id: action.payload.id,
        error: e.toString()
      })
    );
  }
}

function* rateMovie(action: PayloadAction<MoviesDetailsSlice.PRateMovie>) {
  try {
    const sessionId = yield select((state: RootState) => state.user.sessionId);

    yield call(Api.rateMovie, {
      sessionId,
      movieId: action.payload.id,
      rating: action.payload.rating
    });

    yield put(
      MoviesDetailsSlice.ratingSuccess({
        id: action.payload.id,
        rating: action.payload.rating
      })
    );
  } catch (e) {
    console.error(e);
    yield put(
      MoviesDetailsSlice.ratingError({
        id: action.payload.id,
        rating: action.payload.rating,
        error: e.toString()
      })
    );
  }
}

function* addToWatchlist(
  action: PayloadAction<MoviesDetailsSlice.PAddWatchlist>
) {
  try {
    const { sessionId, accountId } = yield select(
      (state: RootState) => state.user
    );

    yield call(Api.addToWatchlist, {
      sessionId,
      accountId,
      movieId: action.payload.id,
      inWatchlist: true
    });

    yield put(MoviesDetailsSlice.addWatchlistSuccess());
  } catch (e) {
    console.error(e);
    yield put(
      MoviesDetailsSlice.addWatchlistError({
        id: action.payload.id,
        error: e.toString()
      })
    );
  }
}

function* removeFromWatchlist(
  action: PayloadAction<MoviesDetailsSlice.PAddWatchlist>
) {
  try {
    const { sessionId, accountId } = yield select(
      (state: RootState) => state.user
    );

    yield call(Api.addToWatchlist, {
      sessionId,
      accountId,
      movieId: action.payload.id,
      inWatchlist: false
    });

    yield put(MoviesDetailsSlice.removeWatchlistSuccess());
  } catch (e) {
    console.error(e);
    yield put(
      MoviesDetailsSlice.removeWatchlistError({
        id: action.payload.id,
        error: e.toString()
      })
    );
  }
}

function* handleShowDetails(action: PayloadAction<string | undefined>) {
  if (action.payload) {
    yield put(
      MoviesDetailsSlice.fetchMovieDetailsRequest({ id: action.payload })
    );
  }
}

function* MoviesDetailsSaga() {
  yield takeLatest(
    MoviesDetailsSlice.fetchMovieDetailsRequest.type,
    fetchMovieDetails
  );
  yield takeEvery(GridSlice.showMovieDetails.type, handleShowDetails);
  yield takeEvery(MoviesDetailsSlice.ratingRequest.type, rateMovie);
  yield takeEvery(MoviesDetailsSlice.addWatchlistRequest.type, addToWatchlist);
  yield takeEvery(
    MoviesDetailsSlice.removeWatchlistRequest.type,
    removeFromWatchlist
  );
}

export default MoviesDetailsSaga;
