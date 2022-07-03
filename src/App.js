import { GlobalRouter } from "./routes";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalRouter />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
