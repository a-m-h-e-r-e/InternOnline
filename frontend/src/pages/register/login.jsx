import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {
  Grid,
  FormControlLabel,
  Button,
  Checkbox,
  Link,
  Typography,
  Box,
} from "@material-ui/core";

import { TextInput, PasswordInput } from "../../components/inputs";
import { Error } from "../../components/notifications";

const useStyle = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyle();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  console.log("the fuck" + JSON.stringify(props.errors));

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/company/posts"); // push user to news when they login
    }
    // if (props.errors) {

    // }
  }, [props]);

  useEffect(() => {
    setErrors(props.errors);
  }, [props]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrors({ ...errors, [prop]: "" });
  };

  const handleSignIn = (event) => {
    props.loginUser(values);
  };

  return (
    <div>
      <Box className={classes.form} noValidate>
        <Typography variant="h5" gutterBottom>
          Welcome back!
        </Typography>
        <TextInput
          value={values.email}
          error={errors.email}
          onChange={handleChange("email")}
          // fullWidth={true}
          label="Email adress"
        />
        <Error value={errors.email} />
        <PasswordInput
          onChange={handleChange("password")}
          value={values.password}
          error={errors.password}
          label="Password"
        />
        <Error value={errors.password} />
        <FormControlLabel
          control={
            <Checkbox
              icon={
                <CheckBoxOutlineBlankIcon
                  fontSize="small"
                  style={{ fontSize: 15 }}
                />
              }
              checkedIcon={
                <CheckBoxIcon fontSize="small" style={{ fontSize: 15 }} />
              }
              name="checkedI"
            />
          }
          label={
            <Typography style={{ lineHeight: "15px", fontSize: "15px" }}>
              Remember me
            </Typography>
          }
        />

        <Button
          id="myId"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              <Typography style={{ lineHeight: "15px", fontSize: "12px" }}>
                Forgot password?
              </Typography>
            </Link>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Box>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(withRouter(Login));
