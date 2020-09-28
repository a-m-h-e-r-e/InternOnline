import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { lightTheme, darkTheme } from "../theme";
import PageNotFound from "../pages/PageNotFound";
import { connect } from "react-redux";
import LoginSignup from "../pages/register/LoginSignup";

import PrivateRoute from "../pages/private-route/PrivateRoute";
import Company from "../pages/company";
import User from "../pages/user";

function App({ themeMode }) {
  // theme mode to toggle between light and dark

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/auth" component={LoginSignup} />
          <PrivateRoute path="/company" component={Company} />
          <Route path="/" component={User} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  themeMode: state.themeModeReducer.themeMode,
});

export default connect(mapStateToProps)(App);
