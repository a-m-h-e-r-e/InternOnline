import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import {
  Paper,
  Grid,
  CardMedia,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Typography,
  Box,
} from "@material-ui/core";

import Login from "./login";
import Signup from "./signup";

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "460px",
  },
  title: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  cover: {
    width: "100%",
    height: "100%",
    // minHeight: "50   0px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  toggler: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    borderRadius: "0px",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "inherit",
    },
  },
  activeToggler: {
    width: "100%",
    height: "50px",
    textAlign: "center",
    backgroundColor: theme.palette.action.hover,
    // backgroundColor: "#00000f",
    borderRadius: "0px",
  },
}));

function LoginSignup() {
  const classes = useStyle();
  let { path, url } = useRouteMatch();
  const [login, setLogin] = useState(true);

  console.log("here is the path " + path);
  return (
    <Grid container style={{ marginTop: 0 }}>
      <Grid item xs={false} sm={2} md={4}></Grid>
      <Grid item xs={12} sm={8} md={4}>
        <Typography
          className={classes.title}
          variant="h3"
          style={{ textAlign: "center", fontWeight: "bolder" }}
          gutterBottom
        >
          InternOnline
        </Typography>
        <Paper elevation={2}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Paper className={classes.root} elevation={0}>
                <Grid container>
                  <Grid item xs={6} sm={6} md={6}>
                    <Button
                      component={Link}
                      to={`${url}/login`}
                      onClick={() => {
                        setLogin(true);
                      }}
                      className={
                        login ? classes.toggler : classes.activeToggler
                      }
                    >
                      {/* <Link to={`${url}/login`}>Login</Link> */}
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Button
                      component={Link}
                      to={`${url}/register`}
                      onClick={() => {
                        setLogin(false);
                      }}
                      className={
                        login ? classes.activeToggler : classes.toggler
                      }
                    >
                      {/* <Link to={`${url}/register`}>Register</Link> */}
                      Signup
                    </Button>
                  </Grid>
                  <Box
                    style={{ padding: "5px", marginTop: "5px", width: "100%" }}
                  >
                    <Switch>
                      <Route path={`${path}/login`} component={Login} />
                      <Route path={`${path}/register`} component={Signup} />
                      {/* <Route path={`${path}`} component={Login} /> */}
                    </Switch>
                    {/* {login ? <Login /> : <Signup />} */}
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={2} md={4}></Grid>
    </Grid>
  );
}

export default LoginSignup;
