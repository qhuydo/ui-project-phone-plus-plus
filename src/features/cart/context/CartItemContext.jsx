import { cartItemType, pushSaleType } from "features/cart/types";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const CartItemContext = createContext({
  cartItem: null,
  pushSale: null,
});

export const useCartItemContext = () => {
  return useContext(CartItemContext);
};

export const CartItemContextProvider = ({ cartItem, pushSale, children }) => {
  return (
    <CartItemContext.Provider value={{ cartItem, pushSale }}>
      {children}
    </CartItemContext.Provider>
  );
};

CartItemContextProvider.propTypes = {
  cartItem: cartItemType,
  pushSale: pushSaleType,
  children: PropTypes.element,
};
