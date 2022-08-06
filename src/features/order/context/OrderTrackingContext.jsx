import { findOrderById } from "features/order/api";
import {
  initialOrderTrackingState,
  orderTrackingReducer,
} from "features/order/stores";
import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const initialOrderTrackingContextState = {
  state: initialOrderTrackingState,
  dispatch() {},
};

const OrderTrackingContext = createContext(initialOrderTrackingContextState);

export const useOrderTrackingContext = () => {
  return useContext(OrderTrackingContext);
};

export const OrderTrackingContextProvider = ({ id, children }) => {
  const [state, dispatch] = useReducer(
    orderTrackingReducer,
    initialOrderTrackingState
  );

  useEffect(() => {
    const order = findOrderById(id);
    dispatch({ type: "ADD_ORDER_DATA", payload: order });
  }, [id]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <OrderTrackingContext.Provider value={contextValue}>
      {children}
    </OrderTrackingContext.Provider>
  );
};

OrderTrackingContextProvider.propTypes = {
  id: PropTypes.string,
  children: PropTypes.element,
};
