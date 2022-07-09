import { alpha, Box, Button, Link, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

function getTextBoxStyleFromPosition(textPosition) {
  switch (textPosition) {
    case "top-left":
      return {
        top: "5%",
        left: "6%",
      };
    case "top-right":
      return {
        top: "5%",
        right: "6%",
      };
    case "middle-right":
      return {
        top: "50%",
        right: "6%",
        // textAlign: "right",
        transform: "translateY(-50%)",
      };
    default:
      // middle-left
      return {
        top: "50%",
        left: "6%",
        transform: "translateY(-50%)",
      };
  }
}

const bannerContainerStyle = (theme) => ({
  // aspectRatio: `3/2`,
  // height: "100%",
  margin: "0 auto",
  overflow: "hidden",
  position: "relative",
  width: "100%",
  height: "500px",
  [theme.breakpoints.up("md")]: {
    aspectRatio: `20/9`,
    height: "initial",
  },
});

const textContainerStyle = (textColour, textBoxWidth, position) => (theme) => ({
  color: textColour,
  zIndex: 10,
  top: "50%",
  left: "50%",
  right: "auto",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  width: "70%",
  [theme.breakpoints.up("md")]: {
    top: "initial",
    left: "initial",
    right: "initial",
    textAlign: "initial",
    transform: "initial",
    width: textBoxWidth ?? "40%",
    ...position,
  },
});

const titleStyle = (theme) => ({
  wordWrap: "break-word",
  typography: "h3",
  fontWeight: "bold",
  [theme.breakpoints.up("md")]: {
    typography: "h1",
    fontSize: `${10 / 3}vw`,
    fontWeight: "bold",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "48px",
  },
});

const subTitleStyle = (theme) => ({
  wordWrap: "break-word",
  mt: 1,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.75vw",
  },

  [theme.breakpoints.up("xl")]: {
    fontSize: "24px",
  },
});

const contentStyle = {
  wordWrap: "break-word",
  mt: 1.25,
};

const buttonContainerStyle = (theme) => ({
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    justifyContent: "initial",
  },
});

const linkStyle = (theme) => ({
  mt: 1.5,
  cursor: "pointer",
  fontSize: "1.25vw",
  [theme.breakpoints.up("xl")]: {
    fontSize: "18px",
  },
});

const buttonStyle = (textColour) => (theme) => ({
  fontSize: "1.25vw",
  // borderRadius: "12px",
  backgroundColor: textColour,
  color: theme.palette.getContrastText(textColour),
  "&:hover": {
    backgroundColor: alpha(textColour, 0.6),
    color: theme.palette.getContrastText(textColour),
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "18px",
  },
});

const imageStyle = {
  zIndex: 1,
  height: "100%",
  objectFit: "cover",
};

function PhoneBanner({
  imgSrc,
  title,
  subTitle,
  content,
  link,
  textPosition,
  textColour,
  textBoxWidth,
}) {
  const position = useMemo(() => {
    return getTextBoxStyleFromPosition(textPosition);
  }, [textPosition]);

  return (
    <Box m={0} p={0} sx={bannerContainerStyle}>
      <Box
        component="img"
        display="inline-block"
        position="absolute"
        top={0}
        width={1}
        src={imgSrc}
        sx={imageStyle}
      />

      <Box
        sx={textContainerStyle(textColour, textBoxWidth, position)}
        position="absolute"
      >
        <Typography variant="h1" sx={titleStyle}>
          {title}
        </Typography>

        {subTitle && (
          <Typography
            variant="subtitle1"
            // fontWeight="bold"
            sx={subTitleStyle}
          >
            {subTitle}
          </Typography>
        )}

        {content && (
          <Typography
            variant="body1"
            // fontSize="1.25vw"
            // fontWeight="bold"
            sx={contentStyle}
          >
            {content}
          </Typography>
        )}

        <Stack
          direction="row"
          alignItems="baseline"
          spacing={2}
          mt={2}
          sx={buttonContainerStyle}
        >
          <Link
            component={RouterLink}
            to={link ?? ""}
            variant="body2"
            color={textColour}
            sx={linkStyle}
          >
            Learn more
          </Link>

          <Button
            type="submit"
            variant="contained"
            sx={buttonStyle(textColour)}
          >
            Buy now
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

PhoneBanner.defaultProps = {
  textPosition: "middle-left",
  textColour: "#000000",
  textBoxWidth: "40%",
};

PhoneBanner.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string,
  textColour: PropTypes.string,
  textBoxWidth: PropTypes.string,
  textPosition: PropTypes.oneOf([
    "middle-left",
    "top-left",
    "top-right",
    "middle-right",
  ]),
};

export default PhoneBanner;
