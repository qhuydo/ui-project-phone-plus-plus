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
} from "features/payment/components/PaymentGrids";
import { usePaymentContext } from "features/payment/context";
import { useCallback } from "react";

const PaymentStep0 = () => {
  const {
    state: { cartItems },
    dispatch,
  } = usePaymentContext();

  const { signIn } = useAuth();

  const onSkipButtonClicked = useCallback(() => {
    signIn();
    dispatch({ type: "DISPLAY_LOGIN_REQUEST_PAGE", payload: false });
  }, [dispatch, signIn]);

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
            // sx={{
            //   borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
            // }}
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
              <Button variant="contained">Login</Button>
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
        <PaymentCheckoutSection cartItems={cartItems} />
      </CheckoutSectionGrid>
    </PaymentContainerGrid>
  );
};

export default PaymentStep0;
