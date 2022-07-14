import PropTypes from "prop-types";
import { FormControl, MenuItem, Select } from "@mui/material";

const PageLimitDropdown = ({ value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <Select value={value} onChange={onChange} labelId="page-limit-select">
        <MenuItem value={8}>8 items per page</MenuItem>
        <MenuItem value={12}>12 items per page</MenuItem>
        <MenuItem value={16}>16 items per page</MenuItem>
        <MenuItem value={32}>32 items per page</MenuItem>
      </Select>
    </FormControl>
  );
};

PageLimitDropdown.propTypes = {
  value: PropTypes.oneOf([8, 12, 16, 32]),
  onChange: PropTypes.func,
};

export default PageLimitDropdown;
