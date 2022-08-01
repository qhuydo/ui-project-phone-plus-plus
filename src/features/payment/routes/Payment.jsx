import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Head } from "components/Head/Head";
import { useAuth } from "features/auth";
import { PaymentStep0 } from "features/payment/components";
import { usePaymentContext } from "features/payment/context";
import { STEPS } from "features/payment/utils";

const Payment = () => {
  const {
    state: { currentStep, allowDisplayingLoginRequestPage },
  } = usePaymentContext();

  const { isAuth } = useAuth();

  return (
    <>
      <Head title={"Checkout"} />

      <Container sx={{ mb: 3 }}>
        <DefaultBreadcrumb currentPage={"Checkout"} />

        <Typography variant={"h3"} textAlign="center" my={1}>
          Checkout
        </Typography>

        {currentStep === 0 && allowDisplayingLoginRequestPage && !isAuth ? (
          <PaymentStep0 />
        ) : (
          <Box width={1} mt={1}>
            <Stepper activeStep={currentStep} alternativeLabel>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Payment;
