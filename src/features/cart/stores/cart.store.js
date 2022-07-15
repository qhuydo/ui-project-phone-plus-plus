export const initialCartState = {
  cartItems: [],
  voucher: null,
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const newCartItem = action.payload;
      const cartItems = state.cartItems;
      let newState;
      for (let i = 0; i < cartItems.length; ++i) {
        if (
          newCartItem.phone.id === cartItems[i].phone.id &&
          newCartItem.version.id === cartItems[i].version.id
        ) {
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
          (item) =>
            !(
              removedCartItem.phone.id === item.phone.id &&
              removedCartItem.version.id === item.version.id
            )
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
        if (
          itemToIncrease.phone.id === cartItems[i].phone.id &&
          itemToIncrease.version.id === cartItems[i].version.id
        ) {
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
          itemToDecrease.phone.id === cartItems[i].phone.id &&
          itemToDecrease.version.id === cartItems[i].version.id &&
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
            (item) =>
              !(
                itemToDecrease.phone.id === item.phone.id &&
                itemToDecrease.version.id === item.version.id
              )
          ),
        };
      }
      if (action.cb) {
        action.cb(newState.cartItems);
      }
      return newState;
    }
    default:
      return state;
  }
};
