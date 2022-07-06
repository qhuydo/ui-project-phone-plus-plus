import { Box, Link, Stack, Typography } from "@mui/material";
import { GOLDEN_RATIO } from "utils/constants";
import map from "assets/images/nearby-store-map.png";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./NearbyStores.css";

const NearbyStoresMap = () => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href="https://youtu.be/dQw4w9WgXcQ"
      overflow="hidden"
      id="nearby-store-map"
      position="relative"
      borderRadius="8px"
      sx={(theme) => ({
        aspectRatio: `${GOLDEN_RATIO}`,
        [theme.breakpoints.up("sm")]: {
          width: "160px",
        },
        [theme.breakpoints.up("md")]: {
          width: "200px",
        },
        [theme.breakpoints.up("lg")]: {
          width: "280px",
        },
        width: "120px",
      })}
    >
      <Box
        component="img"
        position="absolute"
        top={0}
        className="nearby-store-map-img"
        src={map}
        zIndex={1}
      />

      <Stack
        direction="column"
        alignItems="center"
        spacing={1}
        position="absolute"
        left="50%"
        top="50%"
        className="nearby-store-map-inner-container"
        color="black"
        sx={{
          transform: "translate(-50%, -50%)",
        }}
        zIndex={1}
      >
        <OpenInNewIcon />
        <Typography>Open map</Typography>
      </Stack>
    </Link>
  );
};

export default NearbyStoresMap;
