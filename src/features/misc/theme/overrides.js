import { alpha } from "@mui/material";
import { APPBAR_BACKGROUND_LIGHT, ON_APPBAR_BACKGROUND_LIGHT } from "./palette";
import {
  APPBAR_BACKGROUND_DARK,
  ON_APPBAR_BACKGROUND_DARK,
} from "./palette-dark";

const SHAPE = {
  borderRadius: 8,
};

const APP_BAR = {
  colorInherit: {
    backgroundColor: alpha(APPBAR_BACKGROUND_LIGHT, 0.95),
    color: ON_APPBAR_BACKGROUND_LIGHT,
  },
};

const APP_BAR_DARK = {
  colorInherit: {
    backgroundColor: alpha(APPBAR_BACKGROUND_DARK, 0.95),
    color: ON_APPBAR_BACKGROUND_DARK,
  },
};

const SWITCH = {
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: 8,
  },
  switchBase: {
    padding: 1,
    "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + $track": {
        opacity: 1,
        border: "none",
      },
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 13,
    border: "1px solid #bdbdbd",
    backgroundColor: "#fafafa",
    opacity: 1,
    transition:
      "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
};

const CONTAINER = {
  defaultProps: {
    maxWidth: "xl",
  },
};

const PROPS = {
  MuiAppBar: {
    color: "inherit",
  },
  MuiTooltip: {
    arrow: true,
  },
};

export { SHAPE, APP_BAR, APP_BAR_DARK, SWITCH, PROPS, CONTAINER };
