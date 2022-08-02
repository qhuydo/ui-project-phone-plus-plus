import { Stack, Typography } from "@mui/material";
import {
  CartAccordion,
  DeliveryInfoAccordion,
} from "features/payment/components/Accordion";
import Step2Form from "features/payment/components/Step2/Step2Form";
import { usePaymentContext } from "features/payment/context";

const Step2InfoSection = () => {
  const {
    state: { cartItems },
  } = usePaymentContext();

  return (
    <Stack spacing={2} direction="column">
      <CartAccordion cartItems={cartItems} />
      <DeliveryInfoAccordion />
      <Typography variant="h5" fontWeight="bold" px={2}>
        Payment method
      </Typography>
      <Step2Form />
    </Stack>
  );
};

export default Step2InfoSection;
