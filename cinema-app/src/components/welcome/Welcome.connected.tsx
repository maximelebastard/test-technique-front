import React, { useEffect } from "react";
import { useLocation, Redirect } from "react-router";
import Welcome from "./Welcome";
import { useDispatch, useSelector } from "react-redux";
import {
  setRequestToken,
  fetchRequestTokenRequest,
  fetchAccountIdRequest,
  fetchSessionIdRequest
} from "domain/UserSlice";
import { RootState } from "store";

const WelcomeConnected: React.FC = () => {
  const dispatch = useDispatch();
  const { requestToken, sessionId, accountId } = useSelector(
    (state: RootState) => state.user
  );
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (query.get("request_token")) {
      dispatch(setRequestToken(query.get("request_token") as string));
    }
  });

  useEffect(() => {
    if (!requestToken && !query.get("request_token")) {
      dispatch(fetchRequestTokenRequest());
    }
  }, [requestToken, sessionId]);

  useEffect(() => {
    if (requestToken && query.get("approved") === "true") {
      dispatch(fetchSessionIdRequest());
    }
  }, [requestToken, query.get("approved")]);

  useEffect(() => {
    if (!!sessionId) {
      dispatch(fetchAccountIdRequest());
    }
  }, [sessionId]);

  if (sessionId && accountId) {
    return <Redirect to="/" />;
  }

  return (
    <Welcome
      currentUrl={window.location.href}
      requestToken={requestToken}
      sessionId={sessionId}
      accountId={accountId}
    />
  );
};

export default WelcomeConnected;
