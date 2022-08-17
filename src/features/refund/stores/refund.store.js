import { REFUND_METHODS } from "features/refund/utils";

export const initialRefundState = {
  currentStep: 0,
  selectedOrder: null,
  selectedCartItem: null,
  refundInfo: {
    fullName: "",
    email: "",
    phoneIsoCode: "VN",
    phoneNumber: "",
    provinceId: "",
    districtId: "",
    communeId: "",
    street: "",
    content: "I want to exchange my product",
    reasonToRefund: 1,
    policy: 1,
    receive247Support: false,
    termsAndConditionsChecked: false,
    file: null,
  },
  autoFill: false,
  allOrders: [],
  orderIds: [],
  searchId: "",
  refundCurrentStep: 0,
  refundMethod: {
    method: REFUND_METHODS.creditOrDebitCard,
    creditOrDebitCard: {
      nameOnCard: "",
      cardNumber: "",
      mmyy: "",
      cvcCvv: "",
    },
  },
};

export const refundReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTO_FILL_FLAG": {
      return {
        ...state,
        autoFill: !!action?.payload,
      };
    }
    case "SET_REFUND_INFO": {
      return {
        ...state,
        refundInfo: action?.payload || state.refundInfo,
      };
    }
    case "SET_CURRENT_STEP": {
      return {
        ...state,
        currentStep: action?.payload ?? state.currentStep,
      };
    }
    case "SET_ALL_ORDERS": {
      return {
        ...state,
        allOrders: action?.payload?.allOrders ?? state.allOrders,
        orderIds: action?.payload?.orderIds ?? state.orderIds,
      };
    }
    case "SET_SELECTED_ORDER": {
      return {
        ...state,
        selectedOrder: action?.payload?.order ?? null,
        selectedCartItem: action?.payload?.cartItem ?? null,
      };
    }
    case "SET_REFUND_CURRENT_STEP": {
      return {
        ...state,
        refundCurrentStep: action?.payload ?? state?.refundCurrentStep,
      };
    }
    case "SET_REFUND_METHOD": {
      return {
        ...state,
        refundMethod: action?.payload ?? state.refundMethod,
      };
    }
    default:
      return state;
  }
};
