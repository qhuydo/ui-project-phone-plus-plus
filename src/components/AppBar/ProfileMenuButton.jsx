import { alpha, ButtonBase, Stack, Tooltip, Typography } from "@mui/material";
import BackgroundOrLetterAvatar from "components/Avatar/BackgroundOrLetterAvatar";
import PropTypes from "prop-types";

const ProfileMenuButton = ({ openMenu, closeMenu, isSelected }) => {
  return (
    <Tooltip title="Profile menu">
      <ButtonBase
        onClick={openMenu}
        sx={(theme) => ({
          transitions: theme.transitions.create("background-color"),
          borderRadius: "32px",
          py: 1,
          px: 1.25,
          bgcolor: isSelected
            ? alpha(theme.palette.primary.main, 0.08)
            : "transparent",
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.08),
          },
        })}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <BackgroundOrLetterAvatar
            name={"Huy"}
            src="https://i1.sndcdn.com/avatars-000098677007-iayi3j-t500x500.jpg"
          />

          <Typography
            maxWidth="200px"
            textOverflow="ellipsis"
            fontWeight="bold"
            variant="h6"
            noWrap
          >
            Huy cbd
          </Typography>
        </Stack>
      </ButtonBase>
    </Tooltip>
  );
};

ProfileMenuButton.propTypes = {
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
  isSelected: PropTypes.bool,
};

export default ProfileMenuButton;
