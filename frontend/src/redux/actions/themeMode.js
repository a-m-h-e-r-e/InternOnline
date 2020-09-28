import { SET_THEME_MODE } from "./types";

export const setThemeMode = (themeMode) => {
  return {
    type: SET_THEME_MODE,
    themeMode: themeMode,
  };

  //   return {
  //     type: SET_THEME_MODE,
  //     themeMode: themeMode,
  //   };
};
