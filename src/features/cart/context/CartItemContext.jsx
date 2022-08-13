import { cartItemType } from "features/cart/types";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const CartItemContext = createContext({
  cartItem: null,
});

export const useCartItemContext = () => {
  return useContext(CartItemContext);
};

export const CartItemContextProvider = ({ cartItem, children }) => {
  return (
    <CartItemContext.Provider value={{ cartItem }}>
      {children}
    </CartItemContext.Provider>
  );
};

CartItemContextProvider.propTypes = {
  cartItem: cartItemType,
  children: PropTypes.element,
};
