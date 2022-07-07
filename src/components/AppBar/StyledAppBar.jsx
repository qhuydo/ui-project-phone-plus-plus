import { alpha, AppBar, styled } from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create("width"),
  boxShadow: "none",
  borderStyle: "solid",
  borderColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[400]
      : theme.palette.grey[800],
  borderWidth: 0,
  borderBottomWidth: "thin",
  background: alpha(theme.palette.background.default, 0.95),
  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[800]
      : theme.palette.text.primary,
  //
  // ".MuiIconButton-root": {
  //   borderRadius: theme.shape.borderRadius,
  //   color: "inherit",
  //   background: theme.palette.background.default,
  //   padding: theme.spacing(1.5),
  //   [theme.breakpoints.up("sm")]: {
  //     border: `1.75px solid ${theme.palette.grey[300]}`,
  //     borderRadius: theme.shape.borderRadius,
  //   },
  // },
}));

export default StyledAppBar;
