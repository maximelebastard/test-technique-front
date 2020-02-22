import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { history, RootState } from "store";
import { ConnectedRouter } from "connected-react-router";
import Grid from "./components/grid/Grid.connected";
import Header from "components/header/Header";
import Error from "components/error/Error.connected";
import Category from "components/filter/Filter.connected";
import { initRequest } from "domain/MoviesSlice";
import Welcome from "components/welcome/Welcome.connected";

type AppProps = {
  initializeApp: () => void;
  sessionId?: string;
};

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/welcome">
            <Welcome />
          </Route>
          <Route>
            {!this.props.sessionId ? (
              <Redirect to="/welcome" />
            ) : (
              <Fragment>
                <Header />
                <Error />
                <Category />
                <Grid />
              </Fragment>
            )}
          </Route>
        </Switch>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  sessionId: state.user.sessionId
});

const mapDispatchToProps = (dispatch: any) => ({
  initializeApp: () => dispatch(initRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
