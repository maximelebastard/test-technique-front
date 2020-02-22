import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Slice related to the user authentication
 */

interface State {
  isRequestTokenFetching: boolean;
  isSessionIdFetching: boolean;
  isAccountIdFetching: boolean;
  requestToken?: string;
  sessionId?: string;
  accountId?: string;
  fetchError?: string;
}

export const initialState = (): State => {
  const localStorageSessionId = window.localStorage.getItem("tmdb_session");
  const localStorageAccountId = window.localStorage.getItem("tmdb_account");
  return {
    isRequestTokenFetching: false,
    isSessionIdFetching: false,
    isAccountIdFetching: false,
    sessionId: localStorageSessionId ? localStorageSessionId : undefined,
    accountId: localStorageAccountId ? localStorageAccountId : undefined
  };
};

export const slice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    setRequestToken: (state, action: PayloadAction<string>) => {
      state.requestToken = action.payload;
    },
    fetchRequestTokenRequest: state => {
      state.isRequestTokenFetching = true;
      state.fetchError = undefined;
      state.requestToken = undefined;
    },
    fetchRequestTokenSuccess: (state, action: PayloadAction<string>) => {
      state.isRequestTokenFetching = false;
      state.requestToken = action.payload;
    },
    fetchRequestTokenError: (state, action: PayloadAction<string>) => {
      state.isRequestTokenFetching = false;
      state.fetchError = action.payload;
    },
    fetchSessionIdRequest: state => {
      state.isSessionIdFetching = true;
      state.fetchError = undefined;
      state.sessionId = undefined;
    },
    fetchSessionIdSuccess: (state, action: PayloadAction<string>) => {
      state.isSessionIdFetching = false;
      state.sessionId = action.payload;
    },
    fetchSessionIdError: (state, action: PayloadAction<string>) => {
      state.isSessionIdFetching = false;
      state.fetchError = action.payload;
    },
    fetchAccountIdRequest: state => {
      state.isAccountIdFetching = true;
      state.fetchError = undefined;
      state.accountId = undefined;
    },
    fetchAccountIdSuccess: (state, action: PayloadAction<string>) => {
      state.isAccountIdFetching = false;
      state.accountId = action.payload;
    },
    fetchAccountIdError: (state, action: PayloadAction<string>) => {
      state.isAccountIdFetching = false;
      state.fetchError = action.payload;
    }
  }
});

export const {
  setRequestToken,
  fetchRequestTokenRequest,
  fetchRequestTokenSuccess,
  fetchRequestTokenError,
  fetchSessionIdRequest,
  fetchSessionIdSuccess,
  fetchSessionIdError,
  fetchAccountIdRequest,
  fetchAccountIdSuccess,
  fetchAccountIdError
} = slice.actions;

export default slice.reducer;
