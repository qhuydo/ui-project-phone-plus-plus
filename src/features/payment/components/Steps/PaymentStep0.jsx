import { Stack, Typography, Button, Divider } from "@mui/material";
import { useAuth } from "features/auth";
import {
  PaymentCheckoutSection,
  SupportPaymentTypes,
} from "features/payment/components";
import {
  PaymentContainerGrid,
  InfoGrid,
  CheckoutSectionGrid,
} from "features/payment/components/Container";
import { usePaymentContext } from "features/payment/context";
import { useCallback } from "react";

const PaymentStep0 = () => {
  const {
    state: { cartItems, pushSaleMap },
    dispatch,
  } = usePaymentContext();

  const { signIn } = useAuth();

  const onSigninButtonClicked = useCallback(() => {
    dispatch({ type: "DISPLAY_LOGIN_REQUEST_PAGE", payload: false });
    signIn();
  }, [dispatch, signIn]);

  const onSkipButtonClicked = useCallback(() => {
    dispatch({ type: "DISPLAY_LOGIN_REQUEST_PAGE", payload: false });
  }, [dispatch]);

  return (
    <PaymentContainerGrid>
      <InfoGrid>
        <Stack
          width={1}
          minHeight={340}
          direction="column"
          spacing={1}
          justifyContent="space-between"
        >
          <Stack
            width={1}
            minHeight={180}
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Typography>
              Already have a Phone++ account and want to login here?
            </Typography>
            <Stack
              width={1}
              direction="row"
              spacing={1}
              justifyContent="center"
            >
              <Button variant="contained" onClick={onSigninButtonClicked}>
                Login
              </Button>
              <Button variant="outlined" onClick={onSkipButtonClicked}>
                Continue without login
              </Button>
            </Stack>
          </Stack>

          <Divider height="2px" flexItem />

          <SupportPaymentTypes showDivider={false} />
        </Stack>
      </InfoGrid>

      <CheckoutSectionGrid>
        <PaymentCheckoutSection
          cartItems={cartItems}
          pushSaleMap={pushSaleMap}
        />
      </CheckoutSectionGrid>
    </PaymentContainerGrid>
  );
};

export default PaymentStep0;
