import React from "react";
import TextField from "@material-ui/core/TextField";

export default function NumberInput(props) {
  const {
    error,
    helperText,
    value,
    onChange,
    lable,
    margin,
    fullWidth,
  } = props;
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      margin={margin ? margin : "dense"}
      label={lable}
      error={error}
      helperText={helperText}
      value={value}
      type="number"
      onChange={onChange}
      fullWidth={fullWidth ? fullWidth : true}
    />
  );
}
