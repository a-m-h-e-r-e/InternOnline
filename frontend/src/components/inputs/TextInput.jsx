import React from "react";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.warning.light,
  },
}));

export default function TextInput(props) {
  const classes = useStyle();
  const {
    error,
    helperText,
    value,
    defaultValue,
    onChange,
    label,
    margin,
    fullWidth,
    className,
    readOnly,
    type,
  } = props;
  return (
    <TextField
      value={value}
      type={type}
      InputProps={{
        readOnly: readOnly,
      }}
      // className={classes.root}
      className={clsx(className, { [classes.root]: true })}
      id="outlined-basic"
      variant="outlined"
      size="small"
      margin={margin ? margin : "dense"}
      label={label}
      error={error}
      helperText={helperText}
      defaultValue={defaultValue}
      onChange={onChange}
      fullWidth={fullWidth ? fullWidth : true}
    />
  );
}
