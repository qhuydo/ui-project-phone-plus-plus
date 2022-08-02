import { initialPaymentState, paymentReducer } from "features/payment/stores";
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

  const changeContactDetailsValue = useCallback((value) => {
    dispatch({ type: "CHANGE_CONTACT_DETAILS_VALUE", payload: value });
  }, []);

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
      changeContactDetailsValue,
    };
  }, [changeContactDetailsValue, state]);

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

PaymentContextProvider.propTypes = {
  children: PropTypes.element,
};
