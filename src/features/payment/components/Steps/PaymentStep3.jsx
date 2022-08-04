import { Stack, Box, Typography } from "@mui/material";
import { PaymentSucceedImg } from "features/payment/assets";

const PaymentStep3 = () => {
  return (
    <Stack width={1} direction="column" spacing={1}>
      <Box alignSelf="center" component="img" src={PaymentSucceedImg} />
      <Typography alignSelf="center" variant="h4">
        Thank you for placing the order
      </Typography>
    </Stack>
  );
};

export default PaymentStep3;
