import {
  findOrderById,
  refreshOrderStatus,
  getAllOrders,
} from "features/order/api";
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
  useCallback,
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
    const savedOrders = getAllOrders();

    const ids = savedOrders.map((order) => order.id);
    dispatch({ type: "SET_ORDER_IDS", payload: ids });
  }, []);

  useEffect(() => {
    (async () => {
      const order = await findOrderById(id);
      dispatch({ type: "SET_SEARCH_ID", payload: id });
      dispatch({ type: "ADD_ORDER_DATA", payload: order });
    })();
  }, [id]);

  const refreshOrder = useCallback(async () => {
    const order = await refreshOrderStatus(state.order);
    dispatch({ type: "ADD_ORDER_DATA", payload: order });
  }, [state?.order]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      refreshOrder,
    }),
    [refreshOrder, state]
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
