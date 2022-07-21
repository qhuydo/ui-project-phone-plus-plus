import { alpha, styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  display: "flex",
  // width: "100%",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 0, 1.5, 2),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(3)})`,
    // width: "100%",
    transition: theme.transitions.create("border-color"),
    color: theme.palette.text.primary,
    border:
      theme.palette.mode === "light"
        ? `2px solid  ${alpha(theme.palette.grey[300], 0.8)}`
        : `2px solid  ${alpha(theme.palette.grey[300], 0.3)}`,
    borderRadius: `${theme.shape.borderRadius + 8}px`,
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
}));
