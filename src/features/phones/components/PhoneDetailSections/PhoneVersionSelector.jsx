import PropTypes from "prop-types";
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(1),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const PhoneVersionSelector = ({ value, onChange, versions }) => {
  return (
    <StyledToggleButtonGroup
      exclusive
      color="primary"
      value={value.id}
      onChange={onChange}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.shape.borderRadius}px`,
      })}
    >
      {versions.map((item) => (
        <ToggleButton value={item.id} key={item.id}>
          {item.name}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

PhoneVersionSelector.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  versions: PropTypes.array,
};

export default PhoneVersionSelector;
