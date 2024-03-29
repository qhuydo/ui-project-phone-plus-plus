import { getSpecialOfferItems, getPushSaleMap } from "features/cart/api";
import { cartReducer, initialCartState } from "features/cart/stores";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const cartContextInitialState = {
  state: initialCartState,
  dispatch: () => {},
};

const CartContext = createContext(cartContextInitialState);

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
  // const [cartItems, setCartItems] = useLocalStorage("cart", undefined);
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    (initialState) => {
      let cartItems = [];
      try {
        const item = window.localStorage.getItem("cart");
        cartItems = item ? JSON.parse(item) : [];
      } catch (error) {
        console.error(`Error setting localStorage key “cart”:`, error);
      }
      return {
        ...initialState,
        cartItems: cartItems ?? [],
      };
    }
  );

  const setCartItems = useCallback((cartItems) => {
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting localStorage key “cart” even though environment is not a client`
      );
    }
    // console.log(cartItems);
    // Save to local storage
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  }, []);

  const increaseItemQuantity = useCallback(
    (item) => {
      dispatch({ type: "INCREASE_QUANTITY", payload: item, cb: setCartItems });
    },
    [setCartItems]
  );

  const decreaseItemQuantity = useCallback(
    (item) => {
      dispatch({ type: "DECREASE_QUANTITY", payload: item, cb: setCartItems });
    },
    [setCartItems]
  );

  const addItem = useCallback(
    (item) => {
      dispatch({ type: "ADD", payload: item, cb: setCartItems });
    },
    [setCartItems]
  );

  const removeItem = useCallback(
    (item) => {
      dispatch({ type: "REMOVE", payload: item, cb: setCartItems });
    },
    [setCartItems]
  );

  const removeAll = useCallback(() => {
    dispatch({ type: "REMOVE_ALL", cb: setCartItems });
  }, [setCartItems]);

  useEffect(() => {
    (async () => {
      if (state.cartItems) {
        const map = await getPushSaleMap(state.cartItems);
        dispatch({ type: "ADD_PUSH_SALE_MAP", payload: map });
      }
    })();
  }, [state?.cartItems]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      increaseItemQuantity,
      decreaseItemQuantity,
      addItem,
      removeItem,
      removeAll,
    }),
    [
      addItem,
      decreaseItemQuantity,
      increaseItemQuantity,
      removeAll,
      removeItem,
      state,
    ]
  );

  useEffect(() => {
    (async () => {
      const phoneIds = [
        ...new Set(state.cartItems.map((item) => item.phone.id)),
      ];
      const specialOffers = await getSpecialOfferItems(phoneIds);
      dispatch({ type: "ADD_SPECIAL_OFFER_ITEMS", payload: specialOffers });
    })();
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.element,
};
