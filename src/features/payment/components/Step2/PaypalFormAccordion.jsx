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
} from "@mui/material";
import { PaypalIcon } from "features/payment/assets";
import TermAgreementSection from "features/payment/components/Step2/TermAgreementSection";
import { usePaymentContext } from "features/payment/context";
import { PAYMENT_METHODS, PAYMENT_TYPES } from "features/payment/utils";
import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const PaypalFormAccordion = ({ onSubmitted }) => {
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
        setValue("currentSection", PAYMENT_METHODS.paypal);
        clearErrors();
      }
    },
    [clearErrors, setValue]
  );

  const isOpen = useMemo(() => {
    return currentSection === PAYMENT_METHODS.paypal;
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
              Payment by Paypal
            </Typography>

            <Box
              component="img"
              height={40}
              width="auto"
              src={PAYMENT_TYPES.paypal.src}
            />
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <Stack display="column" spacing={1} px={2}>
            <TermAgreementSection />
            <Box display="flex" width={1} justifyContent="center">
              <Button
                variant="contained"
                sx={{ minWidth: 300, bgcolor: "#0070BA" }}
                disabled={!isValid}
                onClick={onSubmitted}
              >
                <Box component="img" src={PaypalIcon} height={22} />
              </Button>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

PaypalFormAccordion.propTypes = {
  onSubmitted: PropTypes.func,
};

export default PaypalFormAccordion;
