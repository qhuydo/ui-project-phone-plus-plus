import { Button } from "@mui/material";
import { useCartContext } from "features/cart/context/CartContext";
import { PaymentCheckoutSection } from "features/payment/components";
import { usePaymentContext } from "features/payment/context";
import { CART_ITEM_SOURCE } from "features/payment/utils";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Router } from "routes";

const CheckoutSection = ({ cardSx }) => {
  const {
    state: { cartItems },
  } = useCartContext();

  const { dispatch: paymentDispatch } = usePaymentContext();

  const navigate = useNavigate();
  const onCheckoutButtonClicked = useCallback(() => {
    paymentDispatch({
      type: "INITIALISE",
      payload: {
        cartItems,
        cartItemSource: CART_ITEM_SOURCE.fromCart,
      },
    });
    navigate(Router.PAYMENT);
  }, [cartItems, paymentDispatch, navigate]);

  return (
    <PaymentCheckoutSection
      cartItems={cartItems}
      cardSx={cardSx}
      buttonGroup={
        <Button
          sx={{ mt: 2, alignSelf: "center", width: 0.9 }}
          variant="contained"
          onClick={onCheckoutButtonClicked}
        >
          Checkout
        </Button>
      }
    />
  );
};

CheckoutSection.propTypes = {
  cardSx: PropTypes.any,
};

export default CheckoutSection;
