import { createTheme } from "@mui/material";
import { COMPONENTS, PROPS, SHAPE } from "features/misc/theme/components";
import { PALETTE } from "./palette";
import { PALETTE_DARK } from "./palette-dark";

export const theme = createTheme({
  mode: "light",
  palette: PALETTE,
  shape: SHAPE,
  components: COMPONENTS,
  props: PROPS,
});

export const darkTheme = createTheme({
  palette: PALETTE_DARK,
  shape: SHAPE,
  components: COMPONENTS,
  props: PROPS,
});
