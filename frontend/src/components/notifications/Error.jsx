import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    //  backgroundColor: theme.palette.error.light,
    //  marginTop: theme.spacing(0.5),
    //  fontWeight: "bold",
    //  marginRight: theme.spacing(0.5),
    //  padding: theme.spacing(1),
    //  justifyContent: "middle",
    //  alignItems: "middle",
    //  justifyItems: "middle",
    //  alignContent: "middle",
  },
  text: {
    fontSize: "12px",
    //  paddingBottom: theme.spacing(1),
    //  lineHeight: 0,
  },
  icon: {
    alignSelf: "center",
    marginRight: "5px",
    fontSize: "14px",

    //  marginTop: theme.spacing(1),
    //  marginRight: theme.spacing(1),
    //  alignItems: "center",
    //  alignSelf: "center",
    //  alignContent: "center",
  },
}));

export default function NumberInput(props) {
  const classes = useStyle();
  const { value } = props;
  return (
    <React.Fragment>
      <Box className={classes.root}>
        {value ? (
          <ErrorOutlineIcon
            fontSize="small"
            color="error"
            className={classes.icon}
          />
        ) : null}
        <Typography
          variant="subtitle2"
          display="inline"
          color="error"
          className={classes.text}
        >
          {value}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
