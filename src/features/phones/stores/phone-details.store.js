export const initialPhoneDetailsState = {
  phoneDetails: null,
  selectedColour: null,
  selectedVersion: null,
  isLoading: false,
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
      const firstVersion = action.payload.versions[0];
      const originalPrice = +firstVersion.originalPrice;
      const salePrice = +firstVersion.salePrice;

      const priceOffPercentage =
        originalPrice === salePrice
          ? 0
          : ((originalPrice - salePrice) / originalPrice) * 100;
      return {
        ...state,
        phoneDetails: action.payload,
        selectedColour: action.payload.colours[0],
        selectedVersion: action.payload.versions[0],
        priceOffPercentage: parseInt(priceOffPercentage),
      };
    }
    case "CHANGE_COLOUR": {
      return {
        ...state,
        selectedColour: action.payload,
      };
    }
    case "CHANGE_VERSION": {
      const originalPrice = +action.payload.originalPrice;
      const salePrice = +action.payload.salePrice;

      const priceOffPercentage =
        originalPrice === salePrice
          ? 0
          : ((originalPrice - salePrice) / originalPrice) * 100;
      return {
        ...state,
        selectedVersion: action.payload,
        priceOffPercentage: parseInt(priceOffPercentage),
      };
    }
    default:
      return state;
  }
};
