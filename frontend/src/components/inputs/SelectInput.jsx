import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

export default function NumberInput(props) {
  const classes = useStyle();
  const {
    error,
    helperText,
    value,
    defaultValue,
    onChange,
    lable,
    margin,
    fullWidth,
    menuItems,
    className,
    variant,
  } = props;

  return (
    <React.Fragment>
      <FormControl
        variant={variant ? variant : "outlined"}
        // className={classes.root}
        margin="dense"
        fullWidth={fullWidth === false ? fullWidth : true}
      >
        <InputLabel id="demo-simple-select-outlined-label">{lable}</InputLabel>
        <Select
          className={clsx(className, { [classes.root]: true })}
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          label={lable}
          // margin="dense"
        >
          {defaultValue ? null : (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
          {menuItems.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}
