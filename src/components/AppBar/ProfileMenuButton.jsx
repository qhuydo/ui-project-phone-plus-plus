import { alpha, ButtonBase, Stack, Tooltip, Typography } from "@mui/material";
import BackgroundOrLetterAvatar from "components/Avatar/BackgroundOrLetterAvatar";
import PropTypes from "prop-types";
import { useAuth } from "features/auth";

const rippleColor = alpha("#000000", 0.08);

const ProfileMenuButton = ({ openMenu, isSelected }) => {
  const { user } = useAuth();
  return user ? (
    <Tooltip title="Profile menu">
      <ButtonBase
        onClick={openMenu}
        sx={(theme) => ({
          transitions: theme.transitions.create("background-color"),
          borderRadius: "32px",
          py: 1,
          px: 1.25,
          bgcolor: isSelected ? rippleColor : "transparent",
          "&:hover": {
            bgcolor: rippleColor,
          },
        })}
      >
        <Stack direction="row" spacing={0.75} alignItems="center">
          <BackgroundOrLetterAvatar
            name={user.name}
            src={user.avatar}
            sx={{ width: "32px", height: "32px" }}
          />

          <Typography
            maxWidth="200px"
            textOverflow="ellipsis"
            fontWeight="bold"
            variant="body1"
            noWrap
          >
            {user.name}
          </Typography>
        </Stack>
      </ButtonBase>
    </Tooltip>
  ) : null;
};

ProfileMenuButton.propTypes = {
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
  isSelected: PropTypes.bool,
};

export default ProfileMenuButton;
