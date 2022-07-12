import { createContext, useContext } from "react";
import PropTypes from "prop-types";

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
  cartItem: PropTypes.object,
  children: PropTypes.element,
};
