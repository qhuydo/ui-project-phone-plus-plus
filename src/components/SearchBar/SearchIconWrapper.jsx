import { styled } from "@mui/material";

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  height: "100%",
  width: "100%",
  right: 0,
  top: 0,
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
}));
