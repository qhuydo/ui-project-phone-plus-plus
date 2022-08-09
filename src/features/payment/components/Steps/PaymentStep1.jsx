import { Button } from "@mui/material";
import { useAuth } from "features/auth";
import { PaymentCheckoutSection } from "features/payment/components";
import {
  PaymentContainerGrid,
  InfoGrid,
  CheckoutSectionGrid,
} from "features/payment/components/Container";
import { Step1InfoSection } from "features/payment/components/Step1";
import { usePaymentContext } from "features/payment/context";
import { getContactDetailsFromUser } from "features/payment/utils";
import { useMemo, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";

const PaymentStep1 = () => {
  const {
    state: { cartItems, contactDetails, autoFill },
    changeContactDetailsValue,
    dispatch,
  } = usePaymentContext();

  const { user } = useAuth();

  const form = useForm({
    defaultValues: useMemo(() => {
      return contactDetails;
    }, [contactDetails]),
    mode: "onTouched",
  });

  const {
    trigger,
    formState: { isValid },
    reset,
  } = form;

  useEffect(() => {
    if (user && !autoFill) {
      const contactDetails2 = getContactDetailsFromUser(user, contactDetails);
      console.log(contactDetails2);
      dispatch({
        type: "CHANGE_CONTACT_DETAILS_VALUE",
        payload: contactDetails2,
      });
      dispatch({ type: "SET_AUTO_FILL_FLAG", payload: true });
      reset(contactDetails2);
    }
  }, [autoFill, contactDetails, dispatch, reset, user]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      changeContactDetailsValue(value);
    });
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
