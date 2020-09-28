import axios from "axios";
import setAuthToken from "../../helpers/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

const api = axios.create({
  // dont forget to change the base url to address the server(django is running)
  baseURL: "http://localhost:3000/api",
  // baseURL: "/api",
  // axiosConfig,
});

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  api
    .post("/register", userData)
    .then((res) => history.push("/auth/login")) // re-direct to login on successful register
    .catch((err) => {
      console.log("errrrrrrrrrrrrrrrrrrrrr" + JSON.stringify(err.response));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  api
    .post("/login", userData)
    .then((res) => {
      // Save to localStorage// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log(decoded);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log("error == " + JSON.stringify(err.response.data));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
