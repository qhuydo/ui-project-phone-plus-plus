import { Button } from "@mui/material";
import { PaymentCheckoutSection } from "features/payment/components";
import { OrderConfirmationDialog } from "features/payment/components/ConfirmationDialog";
import {
  PaymentContainerGrid,
  InfoGrid,
  CheckoutSectionGrid,
} from "features/payment/components/PaymentGrids";
import { Step2InfoSection } from "features/payment/components/Step2";
import { usePaymentContext } from "features/payment/context";
import { useMemo, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";

const PaymentStep2 = () => {
  const {
    state: { cartItems, paymentMethod, contactDetails },
    changePaymentMethodValue,
    dispatch,
  } = usePaymentContext();

  const form = useForm({
    defaultValues: useMemo(() => paymentMethod, [paymentMethod]),
    mode: "onTouched",
  });

  useEffect(() => {
    const subscription = form.watch((value) => changePaymentMethodValue(value));
    return () => subscription.unsubscribe();
  }, [changePaymentMethodValue, form]);

  const onBackButtonClicked = useCallback(async () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 0 });
  }, [dispatch]);

  return (
    <FormProvider {...form}>
      <PaymentContainerGrid>
        <InfoGrid>
          <Step2InfoSection />
        </InfoGrid>

        <CheckoutSectionGrid>
          <PaymentCheckoutSection
            cartItems={cartItems}
            showDeliveryFee
            deliveryMethod={contactDetails.deliveryMethod}
            buttonGroup={
              <Button
                sx={{ mt: 2, alignSelf: "center", width: 0.9 }}
                variant="outlined"
                onClick={onBackButtonClicked}
              >
                Back
              </Button>
            }
          />
        </CheckoutSectionGrid>
      </PaymentContainerGrid>
      <OrderConfirmationDialog />
    </FormProvider>
  );
};

export default PaymentStep2;
