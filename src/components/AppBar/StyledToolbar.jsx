import { styled, Toolbar } from "@mui/material";
import { APPBAR_LARGE, APPBAR_SMALL } from "components/AppBar/AppBar";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_SMALL,
  [theme.breakpoints.up("sm")]: {
    minHeight: APPBAR_LARGE,
    padding: theme.spacing(0, 5),
  },
}));

export default StyledToolbar;
