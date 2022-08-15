import { Stack, Typography, Button, SvgIcon, Link } from "@mui/material";
import { SadIconSvg } from "assets";
import PropTypes from "prop-types";

const iconStyle = (theme) => ({
  width: 200,
  height: 200,
  ".start-color": {
    "--color-start": theme.palette.error.light,
  },
  ".end-color": {
    "--color-stop": theme.palette.error.dark,
  },
});

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Stack
      pt={5}
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <SvgIcon component={SadIconSvg} sx={iconStyle} inheritViewBox />

      <Typography variant="h4" color="error">
        Unexpected error occurred
      </Typography>

      <pre>{error.message}</pre>

      <pre>{error.stack}</pre>

      <Stack spacing={1} direction="row" pt={2}>
        <Link sx={{ textDecoration: "none", color: "text.primary" }} href="/">
          <Button color="inherit">Back to home</Button>
        </Link>
        <Button color="error" variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Stack>
    </Stack>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.any,
  resetErrorBoundary: PropTypes.any,
};

export default ErrorFallback;
