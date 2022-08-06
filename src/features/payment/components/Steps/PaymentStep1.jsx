import { Button } from "@mui/material";
import { PaymentCheckoutSection } from "features/payment/components";
import {
  PaymentContainerGrid,
  InfoGrid,
  CheckoutSectionGrid,
} from "features/payment/components/Container";
import { Step1InfoSection } from "features/payment/components/Step1";
import { usePaymentContext } from "features/payment/context";
import { useMemo, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";

const PaymentStep1 = () => {
  const {
    state: { cartItems, contactDetails },
    changeContactDetailsValue,
    dispatch,
  } = usePaymentContext();

  const form = useForm({
    defaultValues: useMemo(() => contactDetails, [contactDetails]),
    mode: "onTouched",
  });
  const {
    trigger,
    formState: { isValid },
  } = form;

  useEffect(() => {
    const subscription = form.watch((value) =>
      changeContactDetailsValue(value)
    );
    return () => subscription.unsubscribe();
  }, [changeContactDetailsValue, form]);

  const onNextPageButtonClicked = useCallback(async () => {
    await trigger();
    if (isValid) {
      dispatch({ type: "SET_CURRENT_STEP", payload: 1 });
    }
  }, [dispatch, isValid, trigger]);

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
            deliveryMethod={contactDetails.deliveryMethod}
            buttonGroup={
              <Button
                sx={{ mt: 2, alignSelf: "center", width: 0.9 }}
                variant="contained"
                disabled={!form.formState.isValid}
                onClick={onNextPageButtonClicked}
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
