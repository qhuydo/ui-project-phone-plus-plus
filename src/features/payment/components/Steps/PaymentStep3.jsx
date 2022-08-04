import { Stack, Box, Typography, Button, Link } from "@mui/material";
import { PaymentSucceedImg } from "features/payment/assets";
import { OrderInfo } from "features/payment/components/Info";
import { usePaymentContext } from "features/payment/context";
import { Link as RouterLink } from "react-router-dom";
import { Router } from "routes";

const PaymentStep3 = () => {
  const {
    state: { submittedOrder },
  } = usePaymentContext();

  return (
    <Stack width={1} direction="column" spacing={2}>
      <Box alignSelf="center" component="img" src={PaymentSucceedImg} />
      <Typography alignSelf="center" variant="h4">
        Thank you for placing the order
      </Typography>
      <OrderInfo order={submittedOrder} />
      <Stack width={1} spacing={1} justifyContent="center" direction="row">
        <Link
          component={RouterLink}
          underline="none"
          color="inherit"
          to={Router.HOME}
        >
          <Button variant="outlined">Continue shopping</Button>
        </Link>

        {/*TODO add order tracking flow*/}
        <Button variant="contained">Track my order</Button>
      </Stack>
    </Stack>
  );
};

export default PaymentStep3;
