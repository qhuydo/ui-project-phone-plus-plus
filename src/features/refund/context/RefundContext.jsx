import { initialRefundState, refundReducer } from "features/refund/stores";
import PropTypes from "prop-types";
import { createContext, useContext, useReducer, useMemo } from "react";

const RefundContext = createContext({
  state: initialRefundState,
  dispatch: () => {},
});

export const useRefundContext = () => {
  return useContext(RefundContext);
};

export const RefundContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(refundReducer, initialRefundState);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <RefundContext.Provider value={contextValue}>
      {children}
    </RefundContext.Provider>
  );
};

RefundContextProvider.propTypes = {
  children: PropTypes.element,
};
