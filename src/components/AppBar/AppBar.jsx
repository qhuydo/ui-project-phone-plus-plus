import React from "react";
import HideOnScroll from "components/AppBar/HideOnScroll";
import StyledAppBar from "components/AppBar/StyledAppBar";
import AppBarLogo from "components/AppBar/AppBarLogo";
import StyledToolbar from "components/AppBar/StyledToolbar";

export const APPBAR_LARGE = 92;
export const APPBAR_SMALL = 80;

const AppBar = () => {
  return (
    <HideOnScroll>
      <StyledAppBar>
        <StyledToolbar>
          <AppBarLogo />
        </StyledToolbar>
      </StyledAppBar>
    </HideOnScroll>
  );
};

export default AppBar;
