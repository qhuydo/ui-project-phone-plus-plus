import { createTheme } from "@mui/material";
import { PALETTE } from "./palette";
import {
  APP_BAR,
  APP_BAR_DARK,
  CONTAINER,
  PROPS,
  SHAPE,
  SWITCH,
} from "./overrides";
import { PALETTE_DARK } from "./palette-dark";

export const theme = createTheme({
  mode: "light",
  palette: PALETTE,
  shape: SHAPE,
  components: {
    MuiAppBar: APP_BAR,
    MuiSwitch: SWITCH,
    MuiContainer: CONTAINER,
  },
  props: PROPS,
});

export const darkTheme = createTheme({
  palette: PALETTE_DARK,
  shape: SHAPE,
  overrides: {
    MuiAppBar: APP_BAR_DARK,
    MuiSwitch: SWITCH,
  },
  props: PROPS,
});
