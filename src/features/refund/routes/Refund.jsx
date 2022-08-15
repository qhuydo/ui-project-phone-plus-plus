import {
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Head } from "components/Head/Head";
import {
  RefundExchangeStep1,
  RefundExchangeStep2,
  RefundExchangeStep3,
  RefundExchangeStep0,
} from "features/refund/components/Steps";
import {
  RefundContextProvider,
  useRefundContext,
} from "features/refund/context";
import { useEffect } from "react";

const steps = ["Fill the form", "Processing", "Finished"];

const Refund = () => {
  return (
    <RefundContextProvider>
      <RefundBody />
    </RefundContextProvider>
  );
};

const RefundBody = () => {
  const {
    state: { currentStep },
  } = useRefundContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <>
      <Head title={"Refund/Exchange"} />

      <Container sx={{ mb: 3 }}>
        <DefaultBreadcrumb currentPage={"Refunds And Exchanges"} />

        <Typography variant="h3" textAlign="center" mt={3} mb={2}>
          Refunds And Exchanges
        </Typography>

        {currentStep === 0 && <RefundExchangeStep0 />}
        {currentStep > 0 && (
          <>
            <Stepper activeStep={currentStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
              {currentStep === 1 && <RefundExchangeStep1 />}
              {currentStep === 2 && <RefundExchangeStep2 />}
              {currentStep === 3 && <RefundExchangeStep3 />}
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Refund;
