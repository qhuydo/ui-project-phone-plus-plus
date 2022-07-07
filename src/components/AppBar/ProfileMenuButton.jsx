import { alpha, ButtonBase, Stack, Tooltip, Typography } from "@mui/material";
import BackgroundOrLetterAvatar from "components/Avatar/BackgroundOrLetterAvatar";
import PropTypes from "prop-types";

const rippleColor = alpha("#000000", 0.08);

const ProfileMenuButton = ({ openMenu, isSelected }) => {
  return (
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
            name={"Huy"}
            src="https://i1.sndcdn.com/avatars-000098677007-iayi3j-t500x500.jpg"
            sx={{ width: "32px", height: "32px" }}
          />

          <Typography
            maxWidth="200px"
            textOverflow="ellipsis"
            fontWeight="bold"
            variant="body1"
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
