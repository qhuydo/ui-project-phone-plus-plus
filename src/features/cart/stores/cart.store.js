import { isCartItemTheSame } from "features/cart/utils";

export const initialCartState = {
  cartItems: [],
  voucher: null,
  specialOffers: [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const newCartItem = action.payload;
      const cartItems = state.cartItems;
      let newState;
      for (let i = 0; i < cartItems.length; ++i) {
        if (isCartItemTheSame(newCartItem, cartItems[i])) {
          cartItems[i].quantity +=
            newCartItem.quantity > 1 ? newCartItem.quantity : 1;
          newState = {
            ...state,
            cartItems: [...cartItems],
          };
          break;
        }
      }
      if (!newState) {
        newState = {
          ...state,
          cartItems: [...cartItems, newCartItem],
        };
      }
      if (action.cb) {
        action.cb(newState.cartItems);
      }
      return newState;
    }
    case "REMOVE": {
      const removedCartItem = action.payload;
      const cartItems = state.cartItems;
      const newState = {
        ...state,
        cartItems: cartItems.filter(
          (item) => !isCartItemTheSame(removedCartItem, item)
        ),
      };
      if (action.cb) {
        action.cb(newState.cartItems);
      }
      return newState;
    }
    case "INCREASE_QUANTITY": {
      const itemToIncrease = action.payload;
      const cartItems = state.cartItems;
      let newState;
      for (let i = 0; i < cartItems.length; ++i) {
        if (isCartItemTheSame(itemToIncrease, cartItems[i])) {
          cartItems[i].quantity++;
          newState = {
            ...state,
            cartItems: [...cartItems],
          };
        }
      }
      if (!newState) newState = state;
      if (action.cb) {
        action.cb(newState.cartItems);
      }

      return newState;
    }
    case "DECREASE_QUANTITY": {
      const itemToDecrease = action.payload;
      const cartItems = state.cartItems;
      let newState;
      for (let i = 0; i < cartItems.length; ++i) {
        if (
          isCartItemTheSame(itemToDecrease, cartItems[i]) &&
          cartItems[i].quantity > 1
        ) {
          cartItems[i].quantity--;
          newState = {
            ...state,
            cartItems: [...cartItems],
          };
          break;
        }
      }
      if (!newState) {
        newState = {
          ...state,
          cartItems: cartItems.filter(
            (item) => !isCartItemTheSame(itemToDecrease, item)
          ),
        };
      }
      if (action.cb) {
        action.cb(newState.cartItems);
      }
      return newState;
    }
    case "REMOVE_ALL": {
      const newState = {
        ...state,
        cartItems: [],
        voucher: null,
      };
      if (action.cb) {
        action.cb(newState.cartItems);
      }
      return newState;
    }
    case "ADD_SPECIAL_OFFER_ITEMS": {
      return {
        ...state,
        specialOffers: action.payload || state.specialOffers,
      };
    }
    default:
      return state;
  }
};
