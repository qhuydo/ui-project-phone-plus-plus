import { Stack } from "@mui/material";
import CodFormAccordion from "features/payment/components/Step2/CodFormAccordion";
import CreditCardFormAccordion from "features/payment/components/Step2/CreditCardFormAccordion";
import PaypalFormAccordion from "features/payment/components/Step2/PaypalFormAccordion";
import { usePaymentContext } from "features/payment/context";
import { useCallback } from "react";

const Step2Form = () => {
  const { dispatch } = usePaymentContext();

  const onSubmitted = useCallback(() => {
    dispatch({ type: "CHANGE_CONFIRMATION_DIALOG_VISIBILITY", payload: true });
  }, [dispatch]);

  return (
    <Stack width={1} direction="column" spacing={1}>
      <CodFormAccordion onSubmitted={onSubmitted} />
      <CreditCardFormAccordion onSubmitted={onSubmitted} />
      <PaypalFormAccordion onSubmitted={onSubmitted} />
    </Stack>
  );
};

export default Step2Form;
