import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  Paper,
} from "@mui/material";
import { cartItemType } from "features/payment/types";
import { useAccordion } from "hooks";
import PropTypes from "prop-types";
import React from "react";
import { GOLDEN_RATIO } from "utils/constants";
import formatNumberToVND from "utils/currency-formatter";

const CartAccordion = ({ cartItems }) => {
  const { isOpen, handleChange } = useAccordion();

  return (
    <Accordion expanded={isOpen} onChange={handleChange} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        sx={{
          "&:hover": {
            bgcolor: "primary.50",
            color: "primary.main",
          },
          py: 0,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="inherit">
          My cart
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {cartItems?.map((item, idx) => (
          <Stack direction="row" spacing={1} p={1} key={idx}>
            <Paper
              variant="outlined"
              component="img"
              src={item.colour.thumbnail}
              sx={(theme) => ({
                width: 145,
                aspectRatio: `${GOLDEN_RATIO}`,
                borderRadius: `${theme.shape.borderRadius}px`,
              })}
            />

            <Stack direction="column" flexGrow={1}>
              <Stack direction="row" width={1} justifyContent="space-between">
                <Typography variant="h6">{item.phone.name}</Typography>
                <Typography variant="h6">
                  {formatNumberToVND(item.version.salePrice * item.quantity)}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                width={1}
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  {`${item.version.name}, ${item.colour.colourName}`}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                  {`${item.version.displaySalePrice} per item`}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                width={1}
                justifyContent="end"
                alignItems="center"
                spacing={1}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  {`Quantity: ${item.quantity}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

CartAccordion.propTypes = {
  cartItems: PropTypes.arrayOf(cartItemType),
};

export default CartAccordion;
