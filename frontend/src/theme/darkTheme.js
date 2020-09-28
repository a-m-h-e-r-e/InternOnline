import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    type: "dark",

    primary: {
      lighter: "#247BA0",
      light: "#a1af26",
      main: "#ffa726",
      dark: "#c77800",
      contrastText: "#000",
    },
    secondary: {
      main: "#247BA0",
    },
  },
});
