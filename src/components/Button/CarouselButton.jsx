import PropTypes from "prop-types";
import { alpha, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CarouselButton = ({ id, sx, type, variant }) => {
  return (
    <IconButton
      id={id}
      sx={(theme) => ({
        position: "absolute",
        top: "50%",
        zIndex: 10,
        transform: "translateY(-50%)",
        borderRadius: "50%",
        left: type === "next" ? null : -10,
        right: type === "next" ? -10 : null,
        padding: "4px",
        "&:not(.Mui-disabled)": {
          border: variant === "outlined" ? `1.75px solid transparent` : 0,
          background:
            variant === "outlined"
              ? "transparent"
              : alpha(theme.palette.grey[500], 0.4),

          "&:hover": {
            border:
              variant === "outlined"
                ? `1.75px solid ${alpha(theme.palette.grey[500], 0.4)}`
                : null,
            background:
              variant === "outlined"
                ? "transparent"
                : alpha(theme.palette.grey[500], 0.6),
          },
        },
        ...sx,
      })}
    >
      {type === "next" ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
    </IconButton>
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
