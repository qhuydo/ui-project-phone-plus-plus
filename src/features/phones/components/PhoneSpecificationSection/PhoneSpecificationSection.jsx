import {
  Box,
  Button,
  Collapse,
  Divider,
  Paper,
  Stack,
  Typography,
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
              <Box key={idx}>
                {item.content.split("\n").map((i, key) => {
                  return <Typography key={key}>{i}</Typography>;
                })}
              </Box>
            );

          case "img":
            return (
              <Box
                key={idx}
                sx={(theme) => ({
                  width: 0.8,
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
      phoneDetails: { spec },
      isSpecOpen,
    },
    changeSpecOpenState,
  } = usePhoneDetailsContext();

  const changeSpecOpenStateCb = useCallback(
    () => changeSpecOpenState(!isSpecOpen),
    [changeSpecOpenState, isSpecOpen]
  );

  return (
    <Stack
      component={Paper}
      direction="column"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      variant="outlined"
      p={2}
    >
      <Typography variant="h3" textAlign="center">
        Product specification
      </Typography>

      <Box width={1}>
        <Divider sx={{ mb: 2 }} />
      </Box>

      <Box
        sx={(theme) => ({
          width: 0.5,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: `${theme.shape.borderRadius}px`,
          overflow: "hidden",
        })}
      >
        <Box
          component="img"
          src={spec.bannerImg}
          sx={{
            width: 1,
            height: 1,
            objectFit: "cover",
            transition: "transform .3s",
            transform: "scale(1.0)",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>

      <Box sx={{ width: 0.9 }}>
        {spec.collapsedText.split("\n").map((i, key) => {
          return <Typography key={key}>{i}</Typography>;
        })}
      </Box>

      <Collapse in={isSpecOpen} sx={{ width: 0.9 }}>
        <Stack direction="column" spacing={1} alignItems="center">
          {renderContent(spec.contents)}
          <Typography variant="caption">{spec.captionText}</Typography>
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
