import { Stack, Typography, Link, Paper, Button } from "@mui/material";
import { useAuth } from "features/auth";
import { CartAccordion } from "features/payment/components/Accordion";
import { SupportPaymentTypes } from "features/payment/components/Info";
import Step1Form from "features/payment/components/Step1/Step1Form";
import { usePaymentContext } from "features/payment/context";

const Step1InfoSection = () => {
  const {
    state: { cartItems },
  } = usePaymentContext();

  const { isAuth } = useAuth();

  return (
    <Stack spacing={2} direction="column">
      {!isAuth && (
        <Stack
          component={Paper}
          elevation={0}
          variant="outlined"
          width={1}
          direction="row"
          spacing={1}
          p={2}
        >
          <Stack flexGrow={1} direction="column">
            <Typography width={1}>
              <b>Already a member?</b>
            </Typography>

            <Typography>
              Login to access exclusive offers and other benefits, or{" "}
              <Link>register new account</Link>
            </Typography>
          </Stack>

          <Button variant="outlined">Login</Button>
        </Stack>
      )}

      <CartAccordion cartItems={cartItems} openWhenFirstShow />
      <Step1Form />
      <SupportPaymentTypes />
    </Stack>
  );
};

export default Step1InfoSection;
