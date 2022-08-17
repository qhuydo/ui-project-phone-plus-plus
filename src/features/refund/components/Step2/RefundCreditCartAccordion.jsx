import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpIcon from "@mui/icons-material/Help";
import {
  AccordionSummary,
  Stack,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionDetails,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import { PAYMENT_TYPES, cardExpiry } from "features/payment/utils";
import { useRefundContext } from "features/refund/context";
import { REFUND_METHODS } from "features/refund/utils";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

// TODO remove duplications
const RefundCreditCardAccordion = ({ onSubmitted }) => {
  const {
    state: {
      refundMethod: { method },
    },
  } = useRefundContext();

  const {
    formState: { isValid, errors },
    setValue,
    trigger,
    control,
    clearErrors,
  } = useFormContext();

  const isOpen = useMemo(() => {
    return method === REFUND_METHODS.creditOrDebitCard;
  }, [method]);

  const openCarouselCb = useCallback(
    (event, isExpanded) => {
      if (isExpanded) {
        setValue("method", REFUND_METHODS.creditOrDebitCard);
      }
    },
    [setValue]
  );

  useEffect(() => {
    trigger(["creditOrDebitCard"]).then(() => {
      clearErrors("creditOrDebitCard");
    });
  }, [clearErrors, isOpen, trigger]);

  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{ borderColor: isOpen ? "primary.main" : null }}
    >
      <Accordion elevation={0} expanded={isOpen} onChange={openCarouselCb}>
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
              Refund by Credit or Debit card
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
          <Stack display="column" spacing={1} p={2}>
            <Stack display="column" spacing={2} py={0.5}>
              <Controller
                name="creditOrDebitCard.nameOnCard"
                rules={{
                  required:
                    "Please enter your name on the credit or debit card",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="Name on card"
                    required
                  />
                )}
              />

              <Stack direction="row" spacing={1} width={1}>
                <Controller
                  name="creditOrDebitCard.cardNumber"
                  control={control}
                  rules={{
                    validate: {
                      required: (v) =>
                        !isOpen ||
                        v.length !== 0 ||
                        "Please enter your card number",
                    },
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      id="card-number-input"
                      customInput={TextField}
                      variant="outlined"
                      displayType="input"
                      format="#### #### #### ####"
                      mask="_"
                      label="Card number"
                      sx={{ flex: 1 }}
                      error={!!errors["creditOrDebitCard"]?.["cardNumber"]}
                      helperText={
                        errors["creditOrDebitCard"]?.["cardNumber"]?.message ??
                        ""
                      }
                    />
                  )}
                />

                <Controller
                  name="creditOrDebitCard.mmyy"
                  control={control}
                  rules={{
                    validate: {
                      required: (v) =>
                        !isOpen ||
                        v.length !== 0 ||
                        "Please enter your card expiry date",
                    },
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      id="card-expiry-input"
                      customInput={TextField}
                      variant="outlined"
                      displayType="input"
                      format={cardExpiry}
                      placeholder="MM/YY"
                      label="MM/YY"
                      sx={{ flex: 0.5 }}
                      error={!!errors["creditOrDebitCard"]?.["mmyy"]}
                      helperText={
                        errors["creditOrDebitCard"]?.["mmyy"]?.message || ""
                      }
                    />
                  )}
                />

                <Controller
                  name="creditOrDebitCard.cvcCvv"
                  control={control}
                  rules={{
                    validate: {
                      required: (v) =>
                        !isOpen ||
                        v.length !== 0 ||
                        "Please enter your card security code",
                    },
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      id="card-cvc-cvv-input"
                      customInput={TextField}
                      variant="outlined"
                      displayType="input"
                      format="###"
                      placeholder="CVC/CVV"
                      label="CVC/CVV"
                      sx={{ flex: 0.5 }}
                      error={!!errors["creditOrDebitCard"]?.["cvcCvv"]}
                      helperText={
                        errors["creditOrDebitCard"]?.["cvcCvv"]?.message || ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Your security code is a 3-digit number on the back of your card">
                              <IconButton edge="end">
                                <HelpIcon />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Stack>

          <Box display="flex" width={1} justifyContent="center">
            <Button
              variant="contained"
              sx={{ minWidth: 300 }}
              disabled={!isValid}
              onClick={onSubmitted}
            >
              Review & Submit
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

RefundCreditCardAccordion.propTypes = {
  onSubmitted: PropTypes.func,
};

export default RefundCreditCardAccordion;
