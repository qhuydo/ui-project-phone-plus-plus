import { ToggleButton } from "@mui/material";
import BorderlessToggleButtonGroup from "components/Button/BorderlessToggleButtonGroup";
import PropTypes from "prop-types";

const PhonePropertySelector = ({
  properties,
  selectedProperty: selectedPropertyObj,
  onPropertySelected,
}) => {
  return (
    <BorderlessToggleButtonGroup
      size="small"
      color="primary"
      value={selectedPropertyObj.name}
      exclusive
      onChange={(e) => {
        e.preventDefault();
        return onPropertySelected(
          properties.find((value) => value.name === e.target.value)
        );
      }}
    >
      {properties.map((property) => (
        <ToggleButton value={property.name} key={property.name}>
          {property.name}
        </ToggleButton>
      ))}
    </BorderlessToggleButtonGroup>
  );
};

PhonePropertySelector.defaultProps = {
  properties: [],
  selectedProperty: {},
};

PhonePropertySelector.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object),
  selectedProperty: PropTypes.object,
  onPropertySelected: PropTypes.func,
};

export default PhonePropertySelector;
