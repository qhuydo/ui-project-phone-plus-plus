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
import React, { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import router from "routes/router";
import { SearchBar } from "components/SearchBar";
import ProfileMenuButton from "components/AppBar/ProfileMenuButton";
import { ReactComponent as ShoppingCart } from "assets/icons/shopping-cart.svg";
import ProfileMenu from "components/AppBar/ProfileMenu";
import { useAuth } from "features/auth";
import { useDebounce } from "hooks";
import { findPhoneByKeyword } from "features/phones/api";
import SearchBarMenu from "components/SearchBar/SearchBarMenu";

export const APPBAR_LARGE = 92;
export const APPBAR_SMALL = 80;

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword, 300);
  const [phoneResults, setPhoneResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const openMenu = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onSearchKeyChanged = useCallback((e) => {
    setKeyword(e.currentTarget.value);
  }, []);

  const handleKeyPressed = useCallback((e) => {
    if (e.key === "Enter") {
      // TODO navigate to search result page
      setShowSearchResults(false);
    }
  }, []);

  const onSearchBarFocused = useCallback(() => {
    if (phoneResults.length !== 0) {
      setShowSearchResults(true);
    }
  }, [phoneResults.length]);
  const onSearchBarOutOfFocused = useCallback(() => {
    setShowSearchResults(false);
  }, []);

  useEffect(() => {
    if (debouncedKeyword.trim().length === 0) {
      setShowSearchResults(false);
      return;
    }

    findPhoneByKeyword(debouncedKeyword).then((value) => {
      if (value && value.length !== 0) {
        setPhoneResults(value);
      }
      setShowSearchResults(!!value && value.length !== 0);
    });
  }, [debouncedKeyword]);

  const { isAuth, signIn } = useAuth();

  return (
    <>
      <HideOnScroll>
        <StyledAppBar>
          <StyledToolbar>
            <AppBarLogo />

            <Box style={{ flexGrow: 1 }} />

            <Box
              position="relative"
              sx={{
                width: "100%",
                maxWidth: (theme) => `${theme.breakpoints.values["lg"]}px`,
              }}
            >
              <SearchBar
                value={keyword}
                onSearchKeyChanged={onSearchKeyChanged}
                onKeyPressed={handleKeyPressed}
                onFocused={onSearchBarFocused}
                onBlurred={onSearchBarOutOfFocused}
              />

              <SearchBarMenu
                shouldShowSearchMenu={showSearchResults}
                searchResults={phoneResults}
              />
            </Box>

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
