import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const boxStyle =
  (maxLine = 2) =>
  (theme) => {
    const boxHeightInRem =
      +(theme.typography.h6.lineHeight || 0) * (maxLine ?? 2 + 0.5);
    return {
      height: `${boxHeightInRem}rem`,
    };
  };

const titleStyle = (maxLine = 2) => {
  return {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: maxLine,
    WebkitBoxOrient: "vertical",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
  };
};

const PhoneCardTitle = ({ isSelected }) => {
  return (
    <Box sx={boxStyle(1)}>
      <Typography
        variant="h6"
        color={isSelected ? "primary.dark" : "auto"}
        sx={titleStyle(1)}
        textAlign="center"
      >
        SONEY XPERIYA IV
      </Typography>
    </Box>
  );
};

PhoneCardTitle.propTypes = {
  isSelected: PropTypes.bool,
};

export default PhoneCardTitle;
