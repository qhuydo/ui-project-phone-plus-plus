import {
  calculatePhoneDetailsPrices,
  countRating,
  getTotalPages,
} from "features/phones/utils";

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
  isSpecOpen: false,
  ratingCount: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  filterCommentBy: [],
  comments: [],
  recommendedPhones: [],
  currentCommentPage: 1,
  totalCommentPages: 1,
  commentPageLimit: 5,
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
      if (!action.payload)
        return {
          phoneDetails: null,
          selectedColour: null,
          selectedVersion: null,
          colourChanged: false,
          quantity: 1,
          currentDisplayOriginalPrice: 0,
          currentDisplaySalePrice: 0,
          priceOffPercentage: 0,
          filterCommentBy: {},
        };
      const firstVersion = action.payload.versions[0];
      const originalPrice = +firstVersion.originalPrice;
      const salePrice = +firstVersion.salePrice;

      const totalCommentPages = getTotalPages(
        action.payload.comments?.length ?? 0,
        state.commentPageLimit
      );

      return {
        ...state,
        phoneDetails: action.payload,
        selectedColour: action.payload.colours[0],
        selectedVersion: action.payload.versions[0],
        quantity: 1,
        colourChanged: false,
        ...calculatePhoneDetailsPrices(originalPrice, salePrice, 1),
        ratingCount: countRating(action.payload.comments),
        comments: action.payload.comments ?? [],
        totalCommentPages,
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
    case "CHANGE_SPEC_OPEN_STATE": {
      return {
        ...state,
        isSpecOpen: !!action.payload,
      };
    }
    case "CHANGE_FILTERS": {
      // TODO filter comment
      return { ...state, filterCommentBy: action.payload };
    }
    case "ADD_RECOMMENDED_PHONES": {
      return { ...state, recommendedPhones: action.payload ?? [] };
    }
    case "CHANGE_COMMENT_PAGE": {
      return {
        ...state,
        currentCommentPage: +action.payload,
      };
    }
    default:
      return state;
  }
};
