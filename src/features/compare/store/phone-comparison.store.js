const VIEW_MODES = [
  "VIEW_ALL",
  "HIGHLIGHT_DIFFERENCES",
  "SHOW_ONLY_DIFFERENCES",
];

export const initialPhoneComparisonState = {
  // oneOf(["VIEW_ALL", "HIGHLIGHT_DIFFERENCES", "SHOW_ONLY_DIFFERENCES"])
  viewMode: "VIEW_ALL",
  // oneOf(["SPEC", "SIZE"])
  currentMode: "SPEC",
  phoneDetails: [],
  // {[section]: {[key]: boolean}}}
  displayedFields: {},
  // [{section: string, data: {[key]: string}}]
  displayedData: [],
  recommendations: [],
  isLoading: false,
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
    default:
      return state;
  }
};
