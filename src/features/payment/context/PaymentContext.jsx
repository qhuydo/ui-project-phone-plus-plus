import { useCartContext } from "features/cart/context/CartContext";
import { submitOrder } from "features/payment/api";
import { initialPaymentState, paymentReducer } from "features/payment/stores";
import { CART_ITEM_SOURCE } from "features/payment/utils";
import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";

const paymentContextInitialState = {
  state: initialPaymentState,
  dispatch: () => {},
};

const PaymentContext = createContext(paymentContextInitialState);

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};

export const PaymentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
  const { removeAll } = useCartContext();

  const changeContactDetailsValue = useCallback((value) => {
    dispatch({ type: "CHANGE_CONTACT_DETAILS_VALUE", payload: value });
  }, []);

  const changePaymentMethodValue = useCallback((value) => {
    dispatch({ type: "CHANGE_PAYMENT_METHOD_VALUE", payload: value });
  }, []);

  const submitOrderCb = useCallback(async () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 2 });
    // TODO handle error state
    const order = await submitOrder(state);
    dispatch({ type: "ADD_SUBMITTED_ORDER", payload: order });

    if (state.cartItemSource === CART_ITEM_SOURCE.fromCart) {
      removeAll();
    }
  }, [removeAll, state]);

  const buyNow = useCallback((cartItem) => {
    dispatch({
      type: "INITIALISE",
      payload: {
        cartItems: [cartItem],
        cartItemSource: CART_ITEM_SOURCE.fromBuyNow,
      },
    });
  }, []);

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
      changeContactDetailsValue,
      changePaymentMethodValue,
      submitOrderCb,
      buyNow,
    };
  }, [
    buyNow,
    changeContactDetailsValue,
    changePaymentMethodValue,
    state,
    submitOrderCb,
  ]);

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

PaymentContextProvider.propTypes = {
  children: PropTypes.element,
};
