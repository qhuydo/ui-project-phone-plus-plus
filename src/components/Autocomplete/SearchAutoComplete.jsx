import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment, alpha, Autocomplete } from "@mui/material";
import PropTypes from "prop-types";

const SearchAutoComplete = ({ label, placeholder, ...others }) => {
  return (
    <Autocomplete
      {...others}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" color="inherit">
                <SearchIcon color="inherit" />
              </InputAdornment>
            ),
            ...params.InputProps,
          }}
          sx={(theme) => ({
            "& .MuiInputBase-root": {
              transition: theme.transitions.create("border-color"),
              color: theme.palette.text.primary,
              borderRadius: `${theme.shape.borderRadius + 8}px`,
              px: 1.5,
              "&:hover": {
                fieldset: {
                  border:
                    theme.palette.mode === "light"
                      ? `2px solid ${alpha(theme.palette.grey[300], 0.8)}`
                      : `2px solid ${alpha(theme.palette.grey[300], 0.3)}`,
                  borderColor: `${theme.palette.primary.main} !important`,
                },
              },
            },
          })}
        />
      )}
    />
  );
};

SearchAutoComplete.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchAutoComplete;
