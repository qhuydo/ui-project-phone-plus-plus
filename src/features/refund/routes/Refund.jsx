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
import Placeholder from "components/Placeholder/Placeholder";
import {
  RefundExchangeStep0,
  RefundExchangeStep1,
  RefundExchangeStep2,
  RefundExchangeStep3,
} from "features/refund/components/Steps";
import React from "react";
const steps = ["Fill the form", "Processing", "Finished"];

const Refund = () => {
  const [activeStep, setActiveStep] = React.useState(0);
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
          sx={{ my: 6 }}
        >
          <RefundExchangeStep1></RefundExchangeStep1>
        </Box>
        {/* <RefundExchangeStep3></RefundExchangeStep3> */}
      </Container>
    </>
  );
};

export default Refund;
