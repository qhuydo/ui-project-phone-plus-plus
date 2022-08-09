import { Stack, SvgIcon, Typography, Button, Link } from "@mui/material";
import { ErrorIconSvg } from "assets";
import { usePaymentContext } from "features/payment/context";
import { Link as RouterLink } from "react-router-dom";
import { Router } from "routes";

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

const PaymentFailed = () => {
  const { submitOrderCb } = usePaymentContext();
  return (
    <Stack
      direction="column"
      spacing={1}
      width={1}
      alignItems="center"
      justifyContent="center"
    >
      <SvgIcon
        component={ErrorIconSvg}
        sx={iconStyle}
        className="svg-gradient-wrapper"
        inheritViewBox
      />

      <Typography variant="h4" color="error" fontWeight="bold">
        Transaction failed
      </Typography>

      <Typography variant="h6">
        The transaction failed due to a technical error
      </Typography>
      <Typography>
        If the money was debited from your account, it will be refunded
        automatically in 5-7 working days.
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        py={1}
      >
        <Link
          component={RouterLink}
          underline="none"
          color="inherit"
          to={Router.HOME}
        >
          <Button variant="outlined">Back to home</Button>
        </Link>
        <Button variant="contained" onClick={submitOrderCb}>
          Retry
        </Button>
      </Stack>
    </Stack>
  );
};

export default PaymentFailed;
