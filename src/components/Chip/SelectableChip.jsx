import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import { useCallback } from "react";

const SelectableChip = ({ value, isSelected, onChange, label }) => {
  const cb = useCallback(
    () => onChange(value, !isSelected),
    [isSelected, onChange, value]
  );

  return (
    <Chip
      onClick={cb}
      variant={isSelected ? "filled" : "outlined"}
      color={isSelected ? "primary" : "default"}
      label={label}
    />
  );
};

SelectableChip.propTypes = {
  value: PropTypes.string,
  isSelected: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.node,
};

export default SelectableChip;
