import { BorderlessToggleButtonGroup } from "components/Button";
import { ToggleButton } from "@mui/material";
import PropTypes from "prop-types";
import { COMPARISON_MODE } from "features/comparison/utils";

const ComparisonModeButton = ({ value, onChange }) => {
  return (
    <BorderlessToggleButtonGroup
      exclusive
      color="primary"
      value={value}
      onChange={onChange}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.shape.borderRadius}px`,
        "& .MuiToggleButtonGroup-grouped": {
          margin: theme.spacing(0.5),
        },
      })}
    >
      {COMPARISON_MODE.map((mode) => (
        <ToggleButton value={mode} key={mode}>
          {mode}
        </ToggleButton>
      ))}
    </BorderlessToggleButtonGroup>
  );
};

ComparisonModeButton.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default ComparisonModeButton;
