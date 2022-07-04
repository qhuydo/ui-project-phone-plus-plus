import { AppBar, styled } from "@mui/material";

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
  background:
    theme.palette.mode === "light"
      ? "rgba(255,255,255,0.90)"
      : theme.palette.background.default,

  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[800]
      : theme.palette.text.primary,
  // "& .MuiIconButton-root": {
  //   borderRadius: theme.shape.borderRadius,
  //   color: "inherit",
  //   background: theme.palette.background.default,
  //   [theme.breakpoints.up("sm")]: {
  //     border: `1px solid ${theme.palette.grey[300]}`,
  //     borderRadius: "8px",
  //   },
  // },
}));

export default StyledAppBar;
