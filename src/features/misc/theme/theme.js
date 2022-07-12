import { alpha, createTheme } from "@mui/material";
import {
  APP_BAR,
  APP_BAR_DARK,
  CONTAINER,
  PROPS,
  SHAPE,
  SWITCH,
} from "features/misc/theme/components";
import { PALETTE } from "./palette";
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
  components: {
    MuiAppBar: APP_BAR_DARK,
    MuiSwitch: SWITCH,
    MuiContainer: CONTAINER,
  },
  props: PROPS,
});

export const COLOUR_OUTLINE = alpha("#000000", 0.12);
