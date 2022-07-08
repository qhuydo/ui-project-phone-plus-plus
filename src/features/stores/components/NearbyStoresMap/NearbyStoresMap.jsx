import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Link, Stack, Typography } from "@mui/material";
import map from "assets/images/nearby-store-map.png";
import PropTypes from "prop-types";
import { GOLDEN_RATIO } from "utils/constants";

// TODO refactor me
const NearbyStoresMap = ({ sx, imageSx, srcMap, typographySx, iconSx }) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href="https://youtu.be/dQw4w9WgXcQ"
      overflow="hidden"
      position="relative"
      sx={(theme) => {
        const sxProps = sx ? sx(theme) : {};
        return {
          ">.nearby-store-map-img": {
            objectFit: "cover",
            transition: "transform .3s",
            width: "100%",
            height: "100%",
            transform: "scale(1.0)",
          },
          ">.nearby-store-map-inner-container": {
            visibility: "hidden",
            opacity: 0,
            transition: "visibility .3s, opacity 0.3s linear",
          },
          "&:hover": {
            boxShadow: theme.shadows[5],
            ">.nearby-store-map-img": {
              transform: "scale(1.1)",
              filter: "blur(4px)",
            },
            ">.nearby-store-map-inner-container": {
              visibility: "visible",
              opacity: 1,
            },
          },
          width: "120px",
          borderRadius: `${theme.shape.borderRadius}px`,
          aspectRatio: `${GOLDEN_RATIO}`,
          ...sxProps,
        };
      }}
    >
      <Box
        component="img"
        position="absolute"
        top={0}
        className="nearby-store-map-img"
        src={srcMap ?? map}
        zIndex={1}
        sx={imageSx}
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
          width: 1,
        }}
        zIndex={1}
      >
        <OpenInNewIcon sx={iconSx} />
        <Typography sx={typographySx}>Open map</Typography>
      </Stack>
    </Link>
  );
};

NearbyStoresMap.propTypes = {
  sx: PropTypes.any,
  imageSx: PropTypes.any,
  srcMap: PropTypes.any,
  iconSx: PropTypes.any,
  typographySx: PropTypes.any,
};

export default NearbyStoresMap;
