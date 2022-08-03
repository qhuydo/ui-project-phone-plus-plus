import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { CartItemList } from "features/payment/components/Info";
import { cartItemType } from "features/payment/types";
import { useAccordion } from "hooks";
import PropTypes from "prop-types";
import React from "react";

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
        <CartItemList cartItems={cartItems} />
      </AccordionDetails>
    </Accordion>
  );
};

CartAccordion.propTypes = {
  cartItems: PropTypes.arrayOf(cartItemType),
};

export default CartAccordion;
