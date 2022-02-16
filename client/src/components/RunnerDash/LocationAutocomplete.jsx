import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import searchLocation from './searchLocation.js';

export default function LocationAutoComplete() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    searchLocation(inputValue, null)
      .then((response) => response.json())
      .then((results) => {
        console.log('searchLocation', results, value);
        if (active) {
          let newOptions = [];

          if (results) {
            console.log(newOptions)
            newOptions = [...newOptions, ...results.features];
          }

          setOptions(newOptions);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      active = false;
    };
  }, [value, inputValue, searchLocation]);

  return (
    <Autocomplete
      id="google-map-demo"
      // sx={{ width: 300 }}
      fullWidth
      getOptionLabel={(option) => option.place_name}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option.place_name === value.place_name}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
    />
  );
}
