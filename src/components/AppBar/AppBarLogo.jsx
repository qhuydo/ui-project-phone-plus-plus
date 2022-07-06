import { Box, Link, styled } from "@mui/material";
import logo from "assets/logo.svg";
import { APPBAR_LARGE, APPBAR_SMALL } from "components/AppBar/AppBar";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

const StyledImg = styled("img")({});

const AppBarLogo = ({ size }) => {
  return (
    <Link underline="none" component={RouterLink} to="/">
      <Box
        sx={(theme) => ({
          height: APPBAR_SMALL,
          [theme.breakpoints.up("sm")]: {
            height: size ? size : APPBAR_LARGE,
          },
        })}
      >
        <StyledImg
          src={logo}
          sx={{ objectFit: "contain", maxHeight: "100%" }}
        />
      </Box>
    </Link>
  );
};

AppBarLogo.propTypes = {
  size: PropTypes.number,
};

export default AppBarLogo;
