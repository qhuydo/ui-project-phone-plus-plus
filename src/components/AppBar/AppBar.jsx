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
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import router from "routes/router";
import { SearchBar } from "components/SearchBar";
import ProfileMenuButton from "components/AppBar/ProfileMenuButton";
import { ReactComponent as ShoppingCart } from "assets/icons/shopping-cart.svg";
import ProfileMenu from "components/AppBar/ProfileMenu";
import { useAuth } from "features/auth";
import { useDebounce } from "hooks";
import { findPhoneByKeyword } from "features/phones/api";
import SearchBarMenu from "components/SearchBar/SearchBarMenu";
import { useCartContext } from "features/cart/context/CartContext";
import { getNumberOfCartItem } from "features/cart/utils";
import { Router } from "routes";

export const APPBAR_LARGE = 92;
export const APPBAR_SMALL = 80;

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword, 300);
  const [phoneResults, setPhoneResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { state: cartState } = useCartContext();

  const openMenu = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onSearchKeyChanged = useCallback((e) => {
    setKeyword(e.currentTarget.value);
  }, []);

  const navigateToResultPage = useCallback(() => {
    setShowSearchResults(false);
    navigate(`${Router.PHONE_SEARCH_RESULT}?keyword=${keyword.trim()}`);
    setKeyword("");
  }, [keyword, navigate]);

  const handleKeyPressed = useCallback(
    (e) => {
      if (e.key === "Enter") {
        navigateToResultPage();
      }
    },
    [navigateToResultPage]
  );

  const onSearchBarFocused = useCallback(() => {
    if (phoneResults.length !== 0) {
      setShowSearchResults(true);
    }
  }, [phoneResults.length]);

  const onSearchBarOutOfFocused = useCallback(() => {
    setShowSearchResults(false);
  }, []);

  const onKeywordCleared = useCallback(() => {
    setKeyword("");
    setPhoneResults([]);
  }, []);

  const nCartItem = useMemo(
    () => getNumberOfCartItem(cartState.cartItems),
    [cartState]
  );

  const forceShowAppBarWhenScrolling = useMemo(() => {
    return location?.pathname === Router.PHONE_COMPARISON;
  }, [location?.pathname]);

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
      <HideOnScroll forceShow={forceShowAppBarWhenScrolling}>
        <StyledAppBar>
          <StyledToolbar>
            <AppBarLogo />

            <Box style={{ flexGrow: 1 }} />

            <Box
              position="relative"
              sx={(theme) => ({
                width: "100%",
                maxWidth: 500,
                [theme.breakpoints.up("md")]: {
                  maxWidth: theme.breakpoints.values["sm"],
                },
                [theme.breakpoints.up("lg")]: {
                  maxWidth: theme.breakpoints.values["md"],
                },
                [theme.breakpoints.up("xl")]: {
                  maxWidth: theme.breakpoints.values["lg"] - 240,
                },
              })}
            >
              <SearchBar
                value={keyword}
                onSearchKeyChanged={onSearchKeyChanged}
                onKeyPressed={handleKeyPressed}
                onFocused={onSearchBarFocused}
                onBlurred={onSearchBarOutOfFocused}
                onCleared={onKeywordCleared}
              />

              <SearchBarMenu
                shouldShowSearchMenu={showSearchResults}
                searchResults={phoneResults}
                onSeeMoreButtonPressed={navigateToResultPage}
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
                    <Badge badgeContent={nCartItem} color="primary">
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
