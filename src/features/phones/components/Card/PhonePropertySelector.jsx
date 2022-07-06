import { ToggleButton } from "@mui/material";
import BorderlessToggleButtonGroup from "components/Button/BorderlessToggleButtonGroup";
import PropTypes from "prop-types";

const PhonePropertySelector = ({
  properties,
  selectedProperty,
  onPropertySelected,
}) => {
  return (
    <BorderlessToggleButtonGroup
      size="small"
      color="primary"
      value={selectedProperty}
      exclusive
      onChange={(e) => {
        e.preventDefault();
        return onPropertySelected(e.target.value);
      }}
    >
      {properties.map((property) => (
        <ToggleButton value={property} key={property}>
          {property}
        </ToggleButton>
      ))}
    </BorderlessToggleButtonGroup>
  );
};

PhonePropertySelector.defaultProps = {
  properties: [],
  selectedProperty: "",
};

PhonePropertySelector.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.string),
  selectedProperty: PropTypes.string,
  onPropertySelected: PropTypes.func,
};

export default PhonePropertySelector;
