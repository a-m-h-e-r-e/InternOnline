import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  FormControlLabel,
  Button,
  Checkbox,
  Link,
  Typography,
  Box,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import classnasmes from "classnames";
import api from "../../api";
import { TextInput, PasswordInput } from "../../components/inputs";
import { Error } from "../../components/notifications";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import validator from "validator";
// import validate from "../../helpers/SignInValidation";
const useStyle = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

function Signup(props) {
  const classes = useStyle();
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    website: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    website: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/news");
    }
  }, [props]);

  useEffect(() => {
    setErrors(props.errors);
  }, [props]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrors({ ...errors, [prop]: "" });
  };

  // useEffect(() => validateInputs(), [values]);
  const handleSignUp = async () => {
    props.registerUser(values, props.history);
  };

  return (
    <div>
      <Box className={classes.form} noValidate>
        <Typography variant="h5" gutterBottom>
          Welcome to InternOnline!
        </Typography>
        <TextInput
          value={values.name}
          error={errors.name}
          label="company name"
          onChange={handleChange("name")}
        />
        <Error value={errors.name} />

        <TextInput
          value={values.website}
          error={errors.website}
          label="website"
          onChange={handleChange("website")}
        />
        <Error value={errors.website} />
        <TextInput
          value={values.email}
          error={errors.email}
          label="email"
          onChange={handleChange("email")}
        />
        <Error value={errors.email} />

        <PasswordInput
          value={values.password}
          error={errors.password}
          label="password"
          value={values.password}
          onChange={handleChange("password")}
        />
        <Error value={errors.password} />

        <PasswordInput
          value={values.confirmPassword}
          error={errors.confirmPassword}
          label="confirm password"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />

        <Error value={errors.confirmPassword} />
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
            <Link href="#">
              <Typography style={{ lineHeight: "15px", fontSize: "10px" }}>
                By signing up you agree to our Terms of Service and Privacy
                Policy
              </Typography>
            </Link>
          }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          className={classes.submit}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
