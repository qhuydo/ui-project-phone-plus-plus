import { alpha, Box, Button, Link, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

// TODO refactor me
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
  }, [textPosition]);

  return (
    <Box
      m={0}
      p={0}
      width="100%"
      position="relative"
      style={{
        margin: "0 auto",
      }}
    >
      <Box
        height="100%"
        position="relative"
        overflow="hidden"
        style={{
          aspectRatio: "20/9",
        }}
      >
        <Box
          component="img"
          display="inline-block"
          position="absolute"
          top={0}
          width={1}
          src={imgSrc}
          style={{ zIndex: 1 }}
        />

        <Box
          sx={{
            color: textColour,
            width: textBoxWidth ?? "40%",
            zIndex: 10,
            ...position,
          }}
          position="absolute"
        >
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={(theme) => ({
              fontSize: `${10 / 3}vw`,
              wordWrap: "break-word",
              [theme.breakpoints.up("xl")]: {
                fontSize: "48px",
              },
            })}
          >
            {title}
          </Typography>

          {subTitle && (
            <Typography
              variant="subtitle1"
              // fontWeight="bold"
              sx={(theme) => ({
                wordWrap: "break-word",
                mt: 1,
                fontSize: "1.75vw",
                [theme.breakpoints.up("xl")]: {
                  fontSize: "24px",
                },
              })}
            >
              {subTitle}
            </Typography>
          )}

          {content && (
            <Typography
              variant="body1"
              // fontSize="1.25vw"
              // fontWeight="bold"
              sx={{
                wordWrap: "break-word",
                mt: 1.25,
              }}
            >
              {content}
            </Typography>
          )}

          <Stack direction="row" alignItems="baseline" spacing={2} mt={2}>
            <Link
              component={RouterLink}
              to={link ?? ""}
              variant="body2"
              color={textColour}
              sx={(theme) => ({
                mt: 1.5,
                cursor: "pointer",
                fontSize: "1.25vw",
                [theme.breakpoints.up("xl")]: {
                  fontSize: "18px",
                },
              })}
            >
              Learn more
            </Link>

            <Button
              type="submit"
              variant="contained"
              sx={(theme) => ({
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
              })}
            >
              Buy now
            </Button>
          </Stack>
        </Box>
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
