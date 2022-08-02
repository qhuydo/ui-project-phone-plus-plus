import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Paper,
  Accordion,
  AccordionSummary,
  Stack,
  Typography,
  Box,
  AccordionDetails,
  Button,
  TextField,
} from "@mui/material";
import TermAgreementSection from "features/payment/components/Step2/TermAgreementSection";
import { usePaymentContext } from "features/payment/context";
import { PAYMENT_METHODS, PAYMENT_TYPES } from "features/payment/utils";
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const CreditCardFormAccordion = () => {
  const {
    state: {
      paymentMethod: { currentSection },
    },
  } = usePaymentContext();

  const {
    clearErrors,
    formState: { isValid },
    setValue,
  } = useFormContext();

  const handleChange = useCallback(
    (event, isExpanded) => {
      if (isExpanded) {
        setValue("currentSection", PAYMENT_METHODS.creditOrDebitCard);
        clearErrors();
      }
    },
    [clearErrors, setValue]
  );

  const isOpen = useMemo(() => {
    return currentSection === PAYMENT_METHODS.creditOrDebitCard;
  }, [currentSection]);

  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{ borderColor: isOpen ? "primary.main" : null }}
    >
      <Accordion elevation={0} expanded={isOpen} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          sx={{
            "&:hover": {
              bgcolor: "primary.50",
              color: "primary.main",
            },
            py: 0,
          }}
        >
          <Stack
            width={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pr={1}
          >
            <Typography variant="h6" color="inherit">
              Payment by Credit or Debit card
            </Typography>

            <Stack direction="row" alignItems="center">
              <Box
                component="img"
                height={40}
                width="auto"
                src={PAYMENT_TYPES.visa.src}
              />
              <Box
                component="img"
                height={40}
                width="auto"
                src={PAYMENT_TYPES.masterCard.src}
              />
            </Stack>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <Stack display="column" spacing={1} px={2}>
            <Stack display="column" spacing={2} py={0.5}>
              <TextField variant="outlined" label="Name on card" required />
              <Stack direction="row" spacing={1} width={1}>
                <TextField
                  variant="outlined"
                  label="Card number"
                  required
                  sx={{ flex: 1 }}
                />

                <TextField
                  variant="outlined"
                  label="MM/YY"
                  required
                  sx={{ flex: 0.5 }}
                />

                <TextField
                  variant="outlined"
                  label="CCV/CVV"
                  required
                  sx={{ flex: 0.5 }}
                />
              </Stack>
            </Stack>
            <TermAgreementSection />
            <Box display="flex" width={1} justifyContent="center">
              <Button
                variant="contained"
                sx={{ minWidth: 300 }}
                disabled={!isValid}
              >
                Review & Submit
              </Button>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default CreditCardFormAccordion;
