import { calculatePhoneDetailsPrices } from "features/phones/utils";

export const initialPhoneDetailsState = {
  phoneDetails: null,
  selectedColour: null,
  selectedVersion: null,
  isLoading: false,
  colourChanged: false,
  quantity: 1,
  currentDisplayOriginalPrice: 0,
  currentDisplaySalePrice: 0,
  priceOffPercentage: 0,
};

export const phoneDetailsReducer = (state, action) => {
  switch (action.type) {
    case "NOTIFY_LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "NOTIFY_LOADED": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_PHONE_DETAILS": {
      if (!action.payload) return state;
      const firstVersion = action.payload.versions[0];
      const originalPrice = +firstVersion.originalPrice;
      const salePrice = +firstVersion.salePrice;

      return {
        ...state,
        phoneDetails: action.payload,
        selectedColour: action.payload.colours[0],
        selectedVersion: action.payload.versions[0],
        quantity: 1,
        colourChanged: false,
        ...calculatePhoneDetailsPrices(originalPrice, salePrice, 1),
      };
    }
    case "CHANGE_COLOUR": {
      return {
        ...state,
        selectedColour: action.payload,
        colourChanged: true,
      };
    }
    case "CHANGE_VERSION": {
      const originalPrice = +action.payload.originalPrice;
      const salePrice = +action.payload.salePrice;

      return {
        ...state,
        selectedVersion: action.payload,
        ...calculatePhoneDetailsPrices(
          originalPrice,
          salePrice,
          state.quantity
        ),
      };
    }
    case "CHANGE_QUANTITY": {
      let quantity = +action.payload;
      if (quantity <= 0 || isNaN(quantity)) {
        quantity = 1;
      }
      return {
        ...state,
        ...calculatePhoneDetailsPrices(
          state.selectedVersion.originalPrice,
          state.selectedVersion.salePrice,
          quantity
        ),
        quantity,
      };
    }
    default:
      return state;
  }
};
