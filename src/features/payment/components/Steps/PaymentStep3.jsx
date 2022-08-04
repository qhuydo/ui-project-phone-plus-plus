import { Stack, Box, Typography } from "@mui/material";
import { PaymentSucceedImg } from "features/payment/assets";
import { OrderInfo } from "features/payment/components/Info";
import { usePaymentContext } from "features/payment/context";

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
    </Stack>
  );
};

export default PaymentStep3;
