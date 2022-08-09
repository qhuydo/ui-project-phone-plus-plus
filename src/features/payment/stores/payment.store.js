import { PAYMENT_METHODS, CART_ITEM_SOURCE } from "features/payment/utils";

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
    method: PAYMENT_METHODS.creditOrDebitCard,
    creditOrDebitCard: {
      nameOnCard: "",
      cardNumber: "",
      mmyy: "",
      cvcCvv: "",
    },
    termsAndConditionsChecked: false,
    discountPromoSubscriptionChecked: false,
  },
  showConfirmationDialog: false,
  submittedOrder: null,
  cartItemSource: CART_ITEM_SOURCE.fromCart,
  autoFill: false,
};

export const paymentReducer = (state, action) => {
  switch (action.type) {
    case "INITIALISE": {
      return {
        ...initialPaymentState,
        cartItems: action.payload?.cartItems ?? [],
        cartItemSource: action.payload?.cartItemSource || state.cartItemSource,
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
          method:
            action.payload ??
            state.paymentMethod?.method ??
            "creditOrDebitCard",
        },
      };
    }
    case "CHANGE_CONFIRMATION_DIALOG_VISIBILITY": {
      return {
        ...state,
        showConfirmationDialog: action?.payload ?? state.showConfirmationDialog,
      };
    }
    case "ADD_SUBMITTED_ORDER": {
      return {
        ...state,
        submittedOrder: action?.payload ?? state.submittedOrder,
      };
    }
    case "AUTO_FILL": {
      const user = action.payload;
      if (!user) return state;

      const { customerDetails, deliveryDetails, billingDetails } =
        state.contactDetails;

      return {
        ...state,
        autoFill: true,
        contactDetails: {
          ...state.contactDetails,
          customerDetails: {
            fullName: user.name || customerDetails.fullName,
            phoneIsoCode: user.phoneIsoCode || customerDetails.phoneIsoCode,
            phoneNumber: user.phoneNumber || customerDetails.phoneNumber,
            email: user.email || customerDetails.email,
          },
          deliveryDetails: {
            ...deliveryDetails,
            provinceId: user.provinceId || deliveryDetails.provinceId,
            districtId: user.districtId || deliveryDetails.districtId,
            communeId: user.communeId || deliveryDetails.communeId,
            street: user.street || deliveryDetails.street,
          },
          billingDetails: {
            ...state.billingDetails,
            provinceId: user.provinceId || billingDetails.provinceId,
            districtId: user.districtId || billingDetails.districtId,
            communeId: user.communeId || billingDetails.communeId,
            street: user.street || billingDetails.street,
          },
        },
      };
    }
    case "SET_AUTO_FILL_FLAG": {
      return {
        ...state,
        autoFill: true,
      };
    }
  }
};
