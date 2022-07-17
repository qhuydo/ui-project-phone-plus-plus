import { alpha, styled } from "@mui/material";

export const SearchBarContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  borderRadius: `${theme.shape.borderRadius + 8}px`,
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
  maxWidth: 500,
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.breakpoints.values["sm"],
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: theme.breakpoints.values["md"],
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: theme.breakpoints.values["lg"] - 100,
  },
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(3),
  //   width: "auto",
  // },
}));
