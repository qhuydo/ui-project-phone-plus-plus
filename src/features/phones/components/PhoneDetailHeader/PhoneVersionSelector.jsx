import PropTypes from "prop-types";
import { ToggleButton } from "@mui/material";
import BorderlessToggleButtonGroup from "components/Button/BorderlessToggleButtonGroup";

const PhoneVersionSelector = ({ value, onChange, versions }) => {
  return (
    <BorderlessToggleButtonGroup
      exclusive
      color="primary"
      value={value.id}
      onChange={onChange}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.shape.borderRadius}px`,
        "& .MuiToggleButtonGroup-grouped": {
          margin: theme.spacing(0.5),
        },
      })}
    >
      {versions.map((item) => (
        <ToggleButton value={item.id} key={item.id}>
          {item.name}
        </ToggleButton>
      ))}
    </BorderlessToggleButtonGroup>
  );
};

PhoneVersionSelector.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  versions: PropTypes.array,
};

export default PhoneVersionSelector;
