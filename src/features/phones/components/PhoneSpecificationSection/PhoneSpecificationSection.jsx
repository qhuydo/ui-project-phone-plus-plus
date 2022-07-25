import {
  Box,
  Button,
  Collapse,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { usePhoneDetailsContext } from "features/phones/context";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback } from "react";

function renderContent(contents) {
  return (
    <>
      {contents.map((item, idx) => {
        switch (item.type) {
          case "text":
            return (
              <Box key={idx} width={{ xs: 1, md: 0.9 }}>
                {item.content.split("\n").map((i, key) => {
                  return <Typography key={key}>{i}</Typography>;
                })}
              </Box>
            );

          case "img":
            return (
              <Box
                key={idx}
                width={{ xs: 1, md: 0.8 }}
                sx={(theme) => ({
                  // border: `1px solid ${theme.palette.divider}`,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  overflow: "hidden",
                })}
              >
                <Box
                  component="img"
                  src={item.content}
                  sx={{
                    width: 1,
                    height: 1,
                    objectFit: "cover",
                    // transition: "transform .3s",
                    // transform: "scale(1.0)",
                    // "&:hover": {
                    //   transform: "scale(1.1)",
                    // },
                  }}
                />
              </Box>
            );
        }
      })}
    </>
  );
}

const PhoneSpecificationSection = () => {
  const {
    state: {
      phoneDetails: { description },
      isSpecOpen,
    },
    changeSpecOpenState,
  } = usePhoneDetailsContext();

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));

  const changeSpecOpenStateCb = useCallback(
    () => changeSpecOpenState(!isSpecOpen),
    [changeSpecOpenState, isSpecOpen]
  );

  return (
    <Stack
      component={Paper}
      direction="column"
      spacing={{ xs: 0.5, md: 1 }}
      alignItems="center"
      justifyContent="center"
      variant={smScreen ? null : "outlined"}
      p={{ xs: 0, md: 2 }}
    >
      <Typography variant={smScreen ? "h4" : "h3"} textAlign="center">
        Product specification
      </Typography>

      <Box width={1}>
        <Divider sx={{ mb: 2 }} />
      </Box>

      <Box
        width={{ xs: 1, md: 0.65 }}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: `${theme.shape.borderRadius}px`,
          overflow: "hidden",
          maxHeight: 360,
          justifyContent: "center",
          [theme.breakpoints.up("sm")]: {
            maxHeight: "initial",
          },
        }}
      >
        <Box
          component="img"
          src={description.bannerImg}
          sx={{
            width: 1,
            height: 1,
            objectFit: "cover",
          }}
        />
      </Box>

      <Box width={{ xs: 1, md: 0.9 }}>
        {description.collapsedText.split("\n").map((i, key) => {
          return <Typography key={key}>{i}</Typography>;
        })}
      </Box>

      <Collapse in={isSpecOpen} width={{ xs: 1, md: 0.9 }}>
        <Stack direction="column" spacing={1} alignItems="center">
          {renderContent(description.contents)}
          <Typography variant="caption">{description.captionText}</Typography>
        </Stack>
      </Collapse>

      <Button
        startIcon={isSpecOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        onClick={changeSpecOpenStateCb}
      >
        {isSpecOpen ? "Collapse" : "View more"}
      </Button>
    </Stack>
  );
};

export default PhoneSpecificationSection;
