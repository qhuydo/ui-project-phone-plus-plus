import PropTypes from "prop-types";
import { useDarkMode } from "hooks";
import { adjust, stringToColor } from "utils/color";
import { Avatar, Typography } from "@mui/material";
import { useMemo } from "react";

function stringAvatar(name, darkTheme) {
  const nameParts = name.split(" ");

  let avatarName = "";
  switch (nameParts.length) {
    case 0:
      break;
    case 1:
      if (nameParts[0].length > 0) {
        avatarName = nameParts[0][0];
      }
      break;
    default:
      if (nameParts[0].length > 0 && nameParts[1].length > 0) {
        avatarName = `${nameParts[0][0]}${nameParts[1][0]}`;
      }
      break;
  }

  let color = stringToColor(name);
  if (darkTheme === true) {
    color = adjust(color, 50);
  }

  return {
    sx: {
      bgcolor: color,
    },
    children: avatarName,
  };
}

const BackgroundOrLetterAvatar = ({ name, fontSize, ...avatarProps }) => {
  const { isDarkMode } = useDarkMode();
  const nameProps = useMemo(() => {
    return stringAvatar(name, isDarkMode);
  }, [isDarkMode, name]);

  const props = useMemo(() => {
    if (avatarProps && avatarProps.sx) {
      return {
        ...avatarProps,
        sx: {
          ...avatarProps.sx,
          ...nameProps.sx,
        },
      };
    } else {
      return {
        ...avatarProps,
        sx: {
          ...nameProps.sx,
        },
      };
    }
  }, [avatarProps, nameProps.sx]);

  return (
    <Avatar {...props}>
      {avatarProps && avatarProps.children ? (
        avatarProps.children
      ) : (
        <Typography fontSize={fontSize}>{nameProps.children}</Typography>
      )}
    </Avatar>
  );
};

BackgroundOrLetterAvatar.propTypes = {
  name: PropTypes.string,
  fontSize: PropTypes.string,
};

export default BackgroundOrLetterAvatar;
