import { COMPARISON_MODE, VIEW_MODES } from "features/comparison/utils";

export const initialPhoneComparisonState = {
  // oneOf(["VIEW_ALL", "HIGHLIGHT_DIFFERENCES", "SHOW_ONLY_DIFFERENCES"])
  viewMode: VIEW_MODES[0],
  // oneOf(["SPEC", "SIZE"])
  comparisonMode: COMPARISON_MODE[0],
  phoneDetails: [],
  // {[section]: {[key]: boolean}}}
  displayedFields: {},
  displayedData: {},
  recommendations: [],
  isLoading: false,
  forceFocusSearchBar: false,
};

export const phoneComparisonReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "ADD_COMPARISON_DATA": {
      return {
        ...state,
        displayedFields:
          action.payload?.displayedFields || state.displayedFields,
        displayedData: action.payload?.displayedData || state.displayedData,
        phoneDetails: action.payload?.phoneDetails || state.phoneDetails,
        isLoading: false,
        recommendations:
          action.payload?.recommendations || state.recommendations,
      };
    }
    case "CHANGE_VIEW_MODE": {
      if (
        !action.payload ||
        !VIEW_MODES.find((mode) => action.payload === mode)
      ) {
        return state;
      }

      return {
        ...state,
        viewMode: action.payload,
      };
    }
    case "CHANGE_COMPARISON_MODE": {
      if (
        !action.payload ||
        !COMPARISON_MODE.find((mode) => action.payload === mode)
      ) {
        return state;
      }

      return {
        ...state,
        comparisonMode: action.payload,
      };
    }
    case "CHANGE_DISPLAYED_FIELDS": {
      return {
        ...state,
        displayedFields: action.payload ?? state.displayedFields,
      };
    }
    case "SET_FORCE_FOCUS_SEARCH_BAR": {
      return {
        ...state,
        forceFocusSearchBar: action.payload ?? state.forceFocusSearchBar,
      };
    }
    default:
      return state;
  }
};
