import { SET_THEME_MODE } from "../actions/types";

const initialState = {
  themeMode: "light",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_THEME_MODE:
      console.log("theme mode " + action.themeMode);
      return {
        ...state,
        themeMode: action.themeMode,
      };
    default:
      return state;
  }
}
