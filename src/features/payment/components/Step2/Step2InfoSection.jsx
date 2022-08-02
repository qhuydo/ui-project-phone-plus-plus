import { Stack } from "@mui/material";
import {
  CartAccordion,
  DeliveryInfoAccordion,
} from "features/payment/components/Accordion";
import { usePaymentContext } from "features/payment/context";

const Step2InfoSection = () => {
  const {
    state: { cartItems },
  } = usePaymentContext();

  return (
    <Stack spacing={2} direction="column">
      <CartAccordion cartItems={cartItems} />
      <DeliveryInfoAccordion />
    </Stack>
  );
};

export default Step2InfoSection;
