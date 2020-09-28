import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function TextInput(props) {
  const {
    error,
    helperText,
    value,
    onChange,
    label,
    disablePast,
    givenDate,
    margin,
    fullWidth,
  } = props;
  const handleChange = (prop) => {
    onChange(prop);
    console.log("time" + prop);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        autoOk
        disablePast={disablePast}
        shouldDisableDate={(date) => date < givenDate - 24 * 60 * 60 * 1000}
        variant="inline"
        label={label}
        value={value}
        onChange={handleChange}
        error={error}
        helperText={helperText}
        inputVariant="outlined"
        placeholder="Placeholder"
        margin={margin ? margin : "dense"}
        fullWidth={fullWidth === false ? false : true}

        // style={{ width: "49%" }}
      />
    </MuiPickersUtilsProvider>
  );
}
