import { Box, Button, Stack, Typography } from "@mui/material";
import EmptyCartImg from "assets/images/empty-cart.png";
import PropTypes from "prop-types";
import router from "routes/router";
import { Link as RouterLink } from "react-router-dom";

const EmptyCartBanner = ({ imgSize, typography, containerWidth }) => {
  return (
    <Stack
      display="column"
      spacing={2}
      alignItems="center"
      width={containerWidth}
    >
      <Box component="img" src={EmptyCartImg} width={imgSize} />

      <Typography variant="h5" color="primary" fontWeight="bold">
        Your Shopping List Is Empty
      </Typography>
      <Typography variant="h6">
        Look like you haven’t made your choice yet
      </Typography>
      <Button variant="outlined" component={RouterLink} to={router.HOME}>
        <Typography color="primary" fontWeight="bold">
          Back to home
        </Typography>
      </Button>
    </Stack>
  );
};

EmptyCartBanner.defaultProps = {
  imgSize: "80%",
  typography: "h2",
};

EmptyCartBanner.propTypes = {
  containerWidth: PropTypes.string,
  imgSize: PropTypes.string,
  typography: PropTypes.string,
};

export default EmptyCartBanner;
