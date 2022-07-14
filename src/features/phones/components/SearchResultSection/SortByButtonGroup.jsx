import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PropTypes from "prop-types";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
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

const SortByButtonGroup = ({ value, onChange }) => {
  return (
    <StyledToggleButtonGroup
      exclusive
      size="small"
      color="primary"
      value={value}
      onChange={onChange}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.shape.borderRadius}px`,
      })}
    >
      <ToggleButton value="RELEVANCE">Relevance</ToggleButton>
      <ToggleButton value="NEWEST">Newest</ToggleButton>
      <ToggleButton value="POPULARITY">Popularity</ToggleButton>
    </StyledToggleButtonGroup>
  );
};

SortByButtonGroup.defaultProps = {
  value: "RELEVANCE",
};

SortByButtonGroup.propTypes = {
  value: PropTypes.oneOf(["RELEVANCE", "NEWEST", "POPULARITY"]),
  onChange: PropTypes.func,
};
export default SortByButtonGroup;
