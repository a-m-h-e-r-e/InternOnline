import { createMuiTheme } from "@material-ui/core";
import { teal, orange } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#52c7b8",
      main: "#247BA0",
      dark: "#00675b",
      contrastText: "#fff",
      lighter: "#efffff",
    },
    secondary: {
      light: "#ffd95b",
      main: "#ffa726",
      dark: "#c77800",
      contrastText: "#000",
    },
    openTitle: teal["700"],
    protectedTitle: orange["700"],
    type: "light",
  },

  // palette: {
  //   primary: {
  //     light: "#52c7b8",
  //     main: "#009688",
  //     dark: "#00675b",
  //     contrastText: "#fff",
  //     lighter: "#efffff",
  //   },
  //   secondary: {
  //     light: "#ffd95b",
  //     main: "#ffa726",
  //     dark: "#c77800",
  //     contrastText: "#000",
  //   },
  //   openTitle: teal["700"],
  //   protectedTitle: orange["700"],
  //   type: "light",
  // },

  // palette: {
  //   primary: {
  //     light: "#52c7b8",
  //     main: "#009688",
  //     dark: "#00675b",
  //     contrastText: "#fff",
  //   },
  //   secondary: {
  //     light: "#ffd95b",
  //     main: "#ffa726",
  //     dark: "#c77800",
  //     contrastText: "#000",
  //   },
  //   openTitle: teal["700"],
  //   protectedTitle: orange["700"],
  //   type: "light",
  // },

  // palette: {
  //   primary: {
  //     main: "#247BA0",
  //     light: "#63ccff",
  //   },
  //   secondary: {
  //     main: "#247BA0",
  //   },
  // },
});
