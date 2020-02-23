import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import moviesReducer from "./domain/MoviesSlice";
import moviesDetailsReducer from "./domain/MoviesDetailsSlice";
import userReducer from "./domain/UserSlice";
import gridReducer from "./domain/GridSlice";
import moviesSaga from "./domain/MoviesSaga";
import moviesDetailsSaga from "./domain/MoviesDetailsSaga";
import userSaga from "./domain/UserSaga";

const sagaMiddleware = createSagaMiddleware();

export const history = createHashHistory();

export const rootReducer = combineReducers({
  router: connectRouter(history),
  user: userReducer,
  movies: moviesReducer,
  moviesDetails: moviesDetailsReducer,
  grid: gridReducer
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
  middleware: [sagaMiddleware, routerMiddleware(history)]
});

sagaMiddleware.run(moviesSaga);
sagaMiddleware.run(moviesDetailsSaga);
sagaMiddleware.run(userSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
