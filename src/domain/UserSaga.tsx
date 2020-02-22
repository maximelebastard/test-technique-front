import { call, put, takeLatest, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import * as Api from "../api/theMovieDb";
import * as UserSlice from "./UserSlice";
import { RootState } from "store";

function* fetchRequestToken() {
  try {
    const res = yield call(Api.authRequestToken);
    yield put(UserSlice.fetchRequestTokenSuccess(res.request_token));
  } catch (err) {
    yield put(UserSlice.fetchRequestTokenError(err.toString()));
  }
}

function* fetchSessionId() {
  const requestToken = yield select(
    (state: RootState) => state.user.requestToken
  );
  if (!requestToken) return;

  try {
    const res = yield call(Api.authSession, { requestToken });
    if (res.success === true) {
      yield put(UserSlice.fetchSessionIdSuccess(res.session_id));
    } else {
      throw Error("Unsuccessful session Id fetching");
    }
  } catch (err) {
    yield put(UserSlice.fetchSessionIdError(err.toString()));
  }
}

function* fetchAccountId() {
  const sessionId = yield select((state: RootState) => state.user.sessionId);
  if (!sessionId) return;

  try {
    const res = yield call(Api.fetchAccount, { sessionId });
    yield put(UserSlice.fetchAccountIdSuccess(res.id));
  } catch (err) {
    yield put(UserSlice.fetchAccountIdError(err.toString()));
  }
}

function* storeSessionId(action: PayloadAction<string>) {
  window.localStorage.setItem("tmdb_session", action.payload);
}

function* storeAccountId(action: PayloadAction<string>) {
  window.localStorage.setItem("tmdb_account", action.payload);
}

function* UserSaga() {
  yield takeLatest(UserSlice.fetchRequestTokenRequest.type, fetchRequestToken);
  yield takeLatest(UserSlice.fetchSessionIdRequest.type, fetchSessionId);
  yield takeLatest(UserSlice.fetchAccountIdRequest.type, fetchAccountId);
  yield takeLatest(UserSlice.fetchSessionIdSuccess.type, storeSessionId);
  yield takeLatest(UserSlice.fetchAccountIdSuccess.type, storeAccountId);
}

export default UserSaga;
