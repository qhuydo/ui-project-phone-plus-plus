import PropTypes from "prop-types";
import { Chip, Typography } from "@mui/material";

const OutlinedChip = ({ isSelected, selectedColour, label, sx }) => {
  return (
    <Chip
      sx={(theme) => {
        return {
          bgcolor: isSelected ? selectedColour : "rgba(0, 0, 0, 0)",
          borderColor: theme.palette.grey[300],
          borderWidth: `1px`,
          ...sx,
        };
      }}
      variant="outlined"
      label={
        <Typography variant="body1" color={isSelected ? "white" : null}>
          {label}
        </Typography>
      }
    />
  );
};

OutlinedChip.defaultProps = {
  isSelected: false,
  selectedColour: "info.main",
  sx: undefined,
};

OutlinedChip.propTypes = {
  isSelected: PropTypes.bool,
  selectedColour: PropTypes.string,
  sx: PropTypes.any,
  label: PropTypes.string.isRequired,
};

export default OutlinedChip;
