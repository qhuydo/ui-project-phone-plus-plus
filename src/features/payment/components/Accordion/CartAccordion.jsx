import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { CartItemList } from "features/payment/components/Info";
import { cartItemType } from "features/cart/types";
import { useAccordion } from "hooks";
import PropTypes from "prop-types";

const CartAccordion = ({ cartItems, openWhenFirstShow }) => {
  const { isOpen, handleChange } = useAccordion(!!openWhenFirstShow);

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
  openWhenFirstShow: PropTypes.bool,
};

export default CartAccordion;
