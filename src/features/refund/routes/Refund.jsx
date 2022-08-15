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
} from "features/refund/components/Steps";
import { RefundContextProvider } from "features/refund/context";
import { useState } from "react";

const steps = ["Fill the form", "Processing", "Finished"];

const Refund = () => {
  return (
    <RefundContextProvider>
      <RefundBody />
    </RefundContextProvider>
  );
};

const RefundBody = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <>
      <Head title={"Refund/Exchange"} />

      <Container sx={{ mb: 3 }}>
        <DefaultBreadcrumb currentPage={"Refunds And Exchanges"} />

        <Typography
          variant={"h3"}
          textAlign="center"
          fontWeight="bold"
          my={5}
          sx={{ textTransform: "uppercase" }}
        >
          Refunds And Exchanges
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ my: 4 }}
        >
          {/*{activeStep === 0 && <RefundExchangeStep0/>}*/}
          {activeStep === 0 && <RefundExchangeStep1 />}
          {activeStep === 1 && <RefundExchangeStep2 />}
          {activeStep === 2 && <RefundExchangeStep3 />}
        </Box>
      </Container>
    </>
  );
};

export default Refund;
