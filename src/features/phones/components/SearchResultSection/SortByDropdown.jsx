import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SortByDropdown = ({ value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="sort-by-select">Sort by</InputLabel>

      <Select
        value={value}
        onChange={onChange}
        labelId="sort-by-select"
        label="Sort by"
      >
        <MenuItem value="NAME_ASC">Name from A to Z</MenuItem>
        <MenuItem value="NAME_DESC">Name from Z to A</MenuItem>
        <MenuItem value="PRICE_DESC">Highest price first</MenuItem>
        <MenuItem value="PRICE_ASC">Lowest price first</MenuItem>
      </Select>
    </FormControl>
  );
};

SortByDropdown.propTypes = {
  value: PropTypes.oneOf(["PRICE_ASC", "PRICE_DESC", "NAME_ASC", "NAME_DESC"]),
  onChange: PropTypes.func,
};

export default SortByDropdown;
