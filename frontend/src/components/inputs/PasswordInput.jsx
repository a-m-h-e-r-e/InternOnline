import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyle = makeStyles((theme) => ({
  root: {
    //  width: "50%",
  },
}));

export default function PasswordInput(props) {
  const classes = useStyle();
  const [showPassword, setShowPassword] = useState(false);
  const {
    error,
    helperText,
    value,
    defaultValue,
    onChange,
    label,
    margin,
    fullWidth,
  } = props;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      className={classes.root}
      variant="outlined"
      margin="dense"
      error={error}
      fullWidth
      // helperText={helperText ? helperText : ""}
    >
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={label ? label.length * 8 : 0}
      />
    </FormControl>
  );
}
