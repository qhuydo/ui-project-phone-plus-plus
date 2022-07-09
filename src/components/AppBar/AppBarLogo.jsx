import { Link, SvgIcon } from "@mui/material";
import { ReactComponent as logo } from "assets/logo/logo.svg";
import { APPBAR_LARGE, APPBAR_SMALL } from "components/AppBar/AppBar";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

const AppBarLogo = ({ size, sx }) => {
  return (
    <Link underline="none" component={RouterLink} to="/" position="relative">
      <SvgIcon
        component={logo}
        inheritViewBox
        className="app-logo"
        sx={(theme) => ({
          height: APPBAR_SMALL,
          width: APPBAR_SMALL,
          [theme.breakpoints.up("sm")]: {
            height: size ? size : APPBAR_LARGE,
            width: size ? size : APPBAR_LARGE,
          },
          aspectRatio: "1",
          ".logo-start-color": {
            "--logo-color-start": theme.palette.primary.main,
          },
          ".logo-end-color": {
            "--logo-color-stop": theme.palette.primary.main,
          },
          ...sx,
        })}
      />
    </Link>
  );
};

AppBarLogo.propTypes = {
  size: PropTypes.number,
  sx: PropTypes.any,
};

export default AppBarLogo;
