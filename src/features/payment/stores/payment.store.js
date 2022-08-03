export const initialPaymentState = {
  cartItems: [],
  currentStep: 0,
  allowDisplayingLoginRequestPage: true,
  contactDetails: {
    customerDetails: {
      fullName: "",
      phoneIsoCode: "VN",
      phoneNumber: "",
      email: "",
    },
    deliveryDetails: {
      provinceId: "",
      districtId: "",
      communeId: "",
      street: "",
      customerNotes: "",
    },
    billingDetails: {
      sameAsDeliveryAddress: true,
      provinceId: "",
      districtId: "",
      communeId: "",
      street: "",
    },
    // "standard, "fast"
    deliveryMethod: "standard",
  },
  paymentMethod: {
    // cod, creditOrDebitCard, paypal
    currentSection: "creditOrDebitCard",
    cod: false,
    creditOrDebitCard: {
      nameOnCard: "",
      cardNumber: "",
      mmyy: "",
      cvcCvv: "",
    },
    paypal: false,
    termsAndConditionsChecked: false,
    discountPromoSubscriptionChecked: false,
  },
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
    case "CHANGE_CONTACT_DETAILS_VALUE": {
      return {
        ...state,
        contactDetails: action.payload ?? state.contactDetails,
      };
    }
    case "CHANGE_PAYMENT_METHOD_VALUE": {
      return {
        ...state,
        paymentMethod: action.payload ?? state.paymentMethod,
      };
    }
    case "SET_CURRENT_STEP": {
      return {
        ...state,
        currentStep: action.payload ?? state.currentStep,
      };
    }
    case "CHOOSE_PAYMENT_METHOD": {
      return {
        ...state,
        paymentMethod: {
          ...state.paymentMethod,
          currentSection:
            action.payload ??
            state.paymentMethod?.currentSection ??
            "creditOrDebitCard",
        },
      };
    }
  }
};
