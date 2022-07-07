import {
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import AppBarLogo from "components/AppBar/AppBarLogo";
import HideOnScroll from "components/AppBar/HideOnScroll";
import StyledAppBar from "components/AppBar/StyledAppBar";
import StyledToolbar from "components/AppBar/StyledToolbar";
import React, { useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import router from "routes/router";
import { SearchBar } from "components/SearchBar";
import ProfileMenuButton from "components/AppBar/ProfileMenuButton";
import { ReactComponent as ShoppingCart } from "assets/icons/shopping-cart.svg";
import ProfileMenu from "components/AppBar/ProfileMenu";
import { useAuth } from "features/auth";

export const APPBAR_LARGE = 92;
export const APPBAR_SMALL = 80;

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const { isAuth, signIn } = useAuth();

  return (
    <>
      <HideOnScroll>
        <StyledAppBar>
          <StyledToolbar>
            <AppBarLogo />

            <Box style={{ flexGrow: 1 }} />

            <SearchBar />

            <Box style={{ flexGrow: 1 }} />

            <Stack direction="row" mx={2} alignItems="center" spacing={1}>
              <Box pr={1.25}>
                <Tooltip title={"My shopping cart"}>
                  <IconButton
                    size="large"
                    color="inherit"
                    edge="end"
                    component={RouterLink}
                    to={router.CART}
                  >
                    <Badge badgeContent={2} color="primary">
                      <SvgIcon component={ShoppingCart} inheritViewBox />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>

              <ProfileMenuButton
                openMenu={openMenu}
                closeMenu={closeMenu}
                isSelected={!!anchorEl}
              />

              {!isAuth ? (
                <>
                  <Button
                    onClick={signIn}
                    variant="contained"
                    style={{ borderWidth: "2px" }}
                  >
                    Login
                  </Button>

                  <Button onClick={signIn} style={{ borderWidth: "2px" }}>
                    Register
                  </Button>
                </>
              ) : null}
            </Stack>
          </StyledToolbar>
        </StyledAppBar>
      </HideOnScroll>

      <ProfileMenu
        id="profile-menu"
        anchorEl={anchorEl}
        onMenuClosed={closeMenu}
      />
    </>
  );
};

export default AppBar;
