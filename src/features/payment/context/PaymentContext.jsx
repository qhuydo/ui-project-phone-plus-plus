import { initialPaymentState, paymentReducer } from "features/payment/stores";
import PropTypes from "prop-types";
import { createContext, useContext, useReducer, useMemo } from "react";

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

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

PaymentContextProvider.propTypes = {
  children: PropTypes.element,
};
