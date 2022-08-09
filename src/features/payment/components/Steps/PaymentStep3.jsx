import { Stack, Box, Typography, Button, Link } from "@mui/material";
import { PaymentSucceedImg } from "features/payment/assets";
import { OrderInfo } from "features/order/components/OrderInfo";
import { PaymentFailed } from "features/payment/components/Step3";
import { usePaymentContext } from "features/payment/context";
import { Link as RouterLink } from "react-router-dom";
import { Router } from "routes";

const PaymentStep3 = () => {
  const {
    state: { submittedOrder, submitFailed },
  } = usePaymentContext();

  return (
    <>
      {submitFailed ? (
        <PaymentFailed />
      ) : (
        <Stack width={1} direction="column" spacing={2}>
          <Box alignSelf="center" component="img" src={PaymentSucceedImg} />

          <Typography alignSelf="center" variant="h4">
            {submittedOrder
              ? "Thank you for placing the order"
              : "Processing your order"}
          </Typography>

          <OrderInfo order={submittedOrder} />
          {submittedOrder && (
            <Stack
              width={1}
              spacing={1}
              justifyContent="center"
              direction="row"
            >
              <Link
                component={RouterLink}
                underline="none"
                color="inherit"
                to={Router.HOME}
              >
                <Button variant="outlined">Continue shopping</Button>
              </Link>

              <Link
                component={RouterLink}
                underline="none"
                color="inherit"
                to={Router.getOrderTrackingPage(submittedOrder?.id)}
              >
                <Button variant="contained">Track my order</Button>
              </Link>
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
};

export default PaymentStep3;
