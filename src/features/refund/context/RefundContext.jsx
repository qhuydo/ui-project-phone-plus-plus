import { getAllOrders } from "features/order/api";
import { isOrderRefundable, getCurrentStatus } from "features/order/utils";
import { initialRefundState, refundReducer } from "features/refund/stores";
import PropTypes from "prop-types";
import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";

const RefundContext = createContext({
  state: initialRefundState,
  dispatch: () => {},
});

export const useRefundContext = () => {
  return useContext(RefundContext);
};

export const RefundContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(refundReducer, initialRefundState);

  useEffect(() => {
    const savedOrders = getAllOrders();

    const allOrders = savedOrders.filter((order) =>
      isOrderRefundable(getCurrentStatus(order))
    );

    dispatch({
      type: "SET_ALL_ORDERS",
      payload: {
        allOrders: allOrders,
        orderIds: allOrders.map((order) => order.id),
      },
    });
  }, []);

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
