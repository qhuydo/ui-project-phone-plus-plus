export const initialPaymentState = {
  cartItems: {},
  currentStep: 0,
};

export const paymentReducer = (state, action) => {
  switch (action.type) {
    case "INITIALISE": {
      return {
        ...state,
        cartItems: action.payload?.cartItems ?? state.cartItems,
        currentStep: 0,
      };
    }
  }
};
