// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import axios from "axios";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Asynchronous(props) {
  const {
    label,
    error,
    helperText,
    multiple,
    fullWidth,
    apiFetch,
    onChange,
    getOptionLabel,
    getOptionSelected,
    size,
    freeSolo,
    setSearch,
    setSelected,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      // await apiFetch.then((res) => console.log(res.data.data));
      let result = await apiFetch();
      console.log(result);
      // // .then((res) => {
      if (active) setOptions(result);
      // // });
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (prop) => {
    // onChange(event);
    // console.log("whyyyyy " + prop);

    setSelected(prop);
  };
  const handleTextChange = (event) => {
    console.log(">>>>>>>>>>>>> " + event.target.value);
    setSearch(event.target.value);
  };
  return (
    <React.Fragment>
      <Autocomplete
        id="asynchronous-demo"
        size={size}
        freeSolo={freeSolo}
        multiple={multiple === false ? false : true}
        fullWidth={fullWidth ? fullWidth : true}
        error={error}
        helpertext={helperText}
        open={open}
        onChange={(event, value) => handleChange(value)}
        // onChange={(event) => onChange()}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={getOptionSelected}
        getOptionLabel={getOptionLabel}
        //   getOptionSelected={(option, value) => option.name === value.name}
        //   getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleTextChange}
            label="Asynchronous"
            variant="outlined"
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </React.Fragment>
  );
}
