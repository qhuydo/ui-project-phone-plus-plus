import { alpha, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";

// eslint-disable-next-line no-unused-vars
const BorderIconButton = styled(({ isSelected, ...props }) => (
  <IconButton size="large" {...props} />
))(({ theme, isSelected, color }) => {
  const letterSpacing = useMemo(
    () => +(theme.typography.button.letterSpacing || 0),
    [theme.typography.button.letterSpacing]
  );

  const selectedColor = useMemo(() => {
    const colorMode = color ?? "primary";
    if (colorMode !== "default" && colorMode !== "inherit") {
      return theme.palette[colorMode].main ?? theme.palette.primary.main;
    } else {
      return colorMode;
    }
  }, [color, theme.palette]);

  const borderColor = useMemo(() => {
    if (isSelected) {
      return selectedColor;
    } else {
      return theme.palette.mode === "light"
        ? `${alpha(theme.palette.grey[600], 0.56)}`
        : `${alpha(theme.palette.grey[600], 0.24)}`;
    }
  }, [isSelected, selectedColor, theme.palette.grey, theme.palette.mode]);

  return {
    border: `1.75px solid ${borderColor}`,
    color: isSelected ? selectedColor : borderColor,
    borderRadius: 8,
    padding: theme.spacing(1.5 - letterSpacing, 2, 1.25 - letterSpacing, 2),
  };
});

export default BorderIconButton;
