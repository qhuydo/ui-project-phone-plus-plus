import { Button } from "@mui/material";
import { PaymentCheckoutSection } from "features/payment/components";
import {
  PaymentContainerGrid,
  InfoGrid,
  CheckoutSectionGrid,
} from "features/payment/components/PaymentGrids";
import { Step1InfoSection } from "features/payment/components/Step1";
import { usePaymentContext } from "features/payment/context";
import { useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

const PaymentStep1 = () => {
  const {
    state: { cartItems, contactDetails },
    changeContactDetailsValue,
  } = usePaymentContext();

  const form = useForm({
    defaultValues: useMemo(() => contactDetails, [contactDetails]),
    mode: "onTouched",
  });

  useEffect(() => {
    const subscription = form.watch((value) =>
      changeContactDetailsValue(value)
    );
    return () => subscription.unsubscribe();
  }, [changeContactDetailsValue, form]);

  return (
    <FormProvider {...form}>
      <PaymentContainerGrid>
        <InfoGrid>
          <Step1InfoSection />
        </InfoGrid>

        <CheckoutSectionGrid>
          <PaymentCheckoutSection
            cartItems={cartItems}
            showDeliveryFee
            addDeliveryFee={contactDetails.deliveryMethod !== "standard"}
            buttonGroup={
              <Button
                sx={{ mt: 2, alignSelf: "center", width: 0.9 }}
                variant="contained"
                disabled={!form.formState.isValid}
              >
                Next
              </Button>
            }
          />
        </CheckoutSectionGrid>
      </PaymentContainerGrid>
    </FormProvider>
  );
};

export default PaymentStep1;
