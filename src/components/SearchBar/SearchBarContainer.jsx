import { alpha, styled } from "@mui/material";

export const SearchBarContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.background.paper, 0.35)
      : theme.palette.background.default,
  transition: theme.transitions.create("background-color"),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.grey[300], 0.45)
        : theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(3),
  width: "100%",
  maxWidth: `${theme.breakpoints.values["lg"]}px`,
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(3),
  //   width: "auto",
  // },
}));
