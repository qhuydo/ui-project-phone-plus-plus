import { FormGroup, Stack, Typography } from "@mui/material";
import BillingDetailsFormSection from "features/payment/components/Step1/BillingDetailsFormSection";
import CustomerDetailsFormSection from "features/payment/components/Step1/CustomerDetailsFormSection";
import DeliveryDetailsFormSection from "features/payment/components/Step1/DeliveryDetailsFormSection";
import DeliveryMethodSection from "features/payment/components/Step1/DeliveryMethodSection";

const Step1Form = () => {
  return (
    <FormGroup>
      <Stack direction="column" spacing={1} width={1} px={1}>
        <Typography variant="h5" fontWeight="bold">
          Contact information & Delivery address
        </Typography>

        <CustomerDetailsFormSection />
        <DeliveryDetailsFormSection />
        <BillingDetailsFormSection />
        <DeliveryMethodSection />
      </Stack>
    </FormGroup>
  );
};

export default Step1Form;
