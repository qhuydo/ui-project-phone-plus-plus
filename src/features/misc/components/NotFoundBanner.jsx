import { Box, Stack, Typography } from "@mui/material";
import NotFoundImg from "assets/images/not-found-img.png";
import PropTypes from "prop-types";

const NotFoundBanner = ({ imgSize, typography, containerWidth }) => {
  return (
    <Stack
      display="column"
      spacing={2}
      alignItems="center"
      width={containerWidth}
    >
      <Box component="img" src={NotFoundImg} width={imgSize} />

      <Typography variant={typography}>
        Oops... We cannot find phone with your keyword search
      </Typography>
    </Stack>
  );
};

NotFoundBanner.defaultProps = {
  imgSize: "80%",
  typography: "h2",
};

NotFoundBanner.propTypes = {
  containerWidth: PropTypes.string,
  imgSize: PropTypes.string,
  typography: PropTypes.string,
};

export default NotFoundBanner;
