import { useDarkMode } from "hooks";
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

  const appTheme = useMemo(
    () => (isDarkMode ? darkTheme : theme),
    [isDarkMode]
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
