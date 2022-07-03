import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: "#4496E0" },
    secondary: { main: "#202B6D" },
    error: { main: red.A400 },
  },
});

export default theme;
