import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import React from "react";

const steps = [
  {
    label: "Customer submit form to PHONE++",
    time: `02/05/2022 09:02:00`,
  },
  {
    label: "Form is confirmed by PHONE++",
    time: "02/05/2022 09:02:00",
  },
  {
    label: "PHONE++ sends to customer an instruction email and a sms",
    time: `02/05/2022 09:02:00`,
  },
  {
    label: "PHONE++ received the product which need to be exchanged/refunded",
    time: `02/05/2022 09:02:00`,
  },
  {
    label: "Customer received the exchanged product or refunded money",
    time: `02/05/2022 09:02:00`,
  },
];

const FormCompleteRefund = () => {
  const [activeStep] = React.useState(2);

  return (
    <Box width={700}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel sx={{ py: 0 }} variant="body1">
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography color="primary" variant="body2">
                {step.time}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormCompleteRefund;
