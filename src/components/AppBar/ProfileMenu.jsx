import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuth } from "features/auth";
import { Router } from "routes";

const profileMenu = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: "50%",
      left: "50%",
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

// TODO: refactor me
const ProfileMenu = ({ id, anchorEl, onMenuClosed }) => {
  const { signOut } = useAuth();

  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={onMenuClosed}
      PaperProps={profileMenu}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      sx={{
        ".MuiMenuItem-root:hover": {
          color: "primary.main",
        },
        ".MuiListItemIcon-root": {
          color: "inherit",
        },
      }}
    >
      <MenuItem component={RouterLink} to="/">
        <ListItemIcon>
          <AccountCircleOutlinedIcon fontSize="small" />
        </ListItemIcon>
        My account
      </MenuItem>

      <MenuItem component={RouterLink} to="/">
        <ListItemIcon>
          <ShoppingBasketOutlinedIcon fontSize="small" />
        </ListItemIcon>
        My orders
      </MenuItem>

      <MenuItem component={RouterLink} to="/">
        <ListItemIcon>
          <HistoryOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Browsing history
      </MenuItem>

      <MenuItem component={RouterLink} to="/">
        <ListItemIcon>
          <FavoriteBorderOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Favourite list
      </MenuItem>

      <MenuItem component={RouterLink} to={Router.REFUND}>
        <ListItemIcon>
          <ChangeCircleOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Exchanges & returns
      </MenuItem>

      <MenuItem
        component={RouterLink}
        to="/"
        onClick={() =>
          signOut(() => {
            onMenuClosed();
          })
        }
      >
        <ListItemIcon>
          <LogoutOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

ProfileMenu.propTypes = {
  id: PropTypes.string,
  anchorEl: PropTypes.any,
  onMenuClosed: PropTypes.func,
};

export default ProfileMenu;
