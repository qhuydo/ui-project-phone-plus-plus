import { IconButton, styled } from "@mui/material";

export const SearchIconWrapper = styled(IconButton)({
  right: 8,
  top: "50%",
  transform: "translateY(-50%)",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  color: "inherit",
  zIndex: 10,
});
