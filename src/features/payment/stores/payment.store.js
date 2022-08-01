export const initialPaymentState = {
  cartItems: [],
  currentStep: 0,
  allowDisplayingLoginRequestPage: true,
};

export const paymentReducer = (state, action) => {
  switch (action.type) {
    case "INITIALISE": {
      return {
        ...initialPaymentState,
        cartItems: action.payload?.cartItems ?? {},
      };
    }
    case "DISPLAY_LOGIN_REQUEST_PAGE": {
      return {
        ...state,
        allowDisplayingLoginRequestPage: action.payload,
      };
    }
  }
};
