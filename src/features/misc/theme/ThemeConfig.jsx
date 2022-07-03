import { useDarkMode } from "../../../hooks";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useMemo } from "react";
import { darkTheme, theme } from "./theme";
import PropTypes from "prop-types";

export function ThemeConfig({ children }) {
  const { isDarkMode } = useDarkMode();
  console.log(isDarkMode);

  const mode = isDarkMode ? "dark" : "light";

  const appTheme = useMemo(
    () => (mode === "light" ? theme : darkTheme),
    [mode]
  );

  return (
    <StyledEngineProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeConfig.propTypes = {
  children: PropTypes.element,
};
