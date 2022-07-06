import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Box, IconButton, Stack, Tooltip } from "@mui/material";
import AppBarLogo from "components/AppBar/AppBarLogo";
import HideOnScroll from "components/AppBar/HideOnScroll";
import StyledAppBar from "components/AppBar/StyledAppBar";
import StyledToolbar from "components/AppBar/StyledToolbar";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import router from "routes/router";

export const APPBAR_LARGE = 92;
export const APPBAR_SMALL = 80;

const AppBar = () => {
  return (
    <HideOnScroll>
      <StyledAppBar>
        <StyledToolbar>
          <AppBarLogo />

          <Box style={{ flexGrow: 1 }} />

          <Stack direction="row" mx={2} alignItems="center" spacing={2}>
            <Box>
              <Badge badgeContent={2} color="primary">
                <IconButton
                  size="large"
                  color="inherit"
                  edge="end"
                  component={RouterLink}
                  to={router.CART}
                >
                  <Tooltip title={"My shopping cart"}>
                    <ShoppingCartOutlinedIcon />
                  </Tooltip>
                </IconButton>
              </Badge>
            </Box>
          </Stack>
        </StyledToolbar>
      </StyledAppBar>
    </HideOnScroll>
  );
};

export default AppBar;
