import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { useRefundContext } from "features/refund/context";
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
  const {
    state: { refundCurrentStep },
  } = useRefundContext();

  return (
    <Box width={700}>
      <Stepper activeStep={refundCurrentStep} orientation="vertical">
        {steps.map((step, idx) => (
          <Step key={step.label}>
            <StepLabel sx={{ py: 0 }}>
              <Typography variant="subtitle1">{step.label}</Typography>
              {idx <= refundCurrentStep && (
                <Typography color="primary" variant="body2">
                  {step.time}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormCompleteRefund;
