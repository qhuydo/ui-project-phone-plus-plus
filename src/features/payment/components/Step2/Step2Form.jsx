import { Stack } from "@mui/material";
import CodFormAccordion from "features/payment/components/Step2/CodFormAccordion";
import CreditCardFormAccordion from "features/payment/components/Step2/CreditCardFormAccordion";
import PaypalFormAccordion from "features/payment/components/Step2/PaypalFormAccordion";

const Step2Form = () => {
  return (
    <Stack width={1} direction="column" spacing={1}>
      <CodFormAccordion />
      <CreditCardFormAccordion />
      <PaypalFormAccordion />
    </Stack>
  );
};

export default Step2Form;
