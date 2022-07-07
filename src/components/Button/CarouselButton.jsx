import PropTypes from "prop-types";
import { alpha, Box, IconButton, Tooltip } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CarouselButton = ({ id, sx, tooltipContent, type, variant }) => {
  return (
    <Box
      id={id}
      style={{
        position: "absolute",
        top: "50%",
        zIndex: 10,
        transform: "translateY(-50%)",
        borderRadius: "50%",
        left: type === "next" ? null : -10,
        right: type === "next" ? -10 : null,
      }}
      sx={{
        background:
          variant === "outlined"
            ? "transparent"
            : (theme) => alpha(theme.palette.grey[500], 0.4),
        ...sx,
      }}
      role="button"
    >
      <Tooltip
        title={
          tooltipContent
            ? tooltipContent
            : type === "next"
            ? "Next slide"
            : "Previous slide"
        }
      >
        <IconButton style={{ padding: "4px" }}>
          {type === "next" ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

CarouselButton.defaultProps = {
  type: "previous",
  variant: "filled",
};

CarouselButton.propTypes = {
  id: PropTypes.string,
  sx: PropTypes.any,
  tooltipContent: PropTypes.string,
  type: PropTypes.oneOf(["previous", "next"]),
  variant: PropTypes.oneOf(["filled", "outlined"]),
};

export default CarouselButton;
