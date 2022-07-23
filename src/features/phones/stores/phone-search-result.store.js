import { getTotalPages } from "features/phones/utils";
import { MAX_PRICE, MIN_PRICE } from "utils/constants";

export const defaultFilterOptions = {
  priceRange: [MIN_PRICE, MAX_PRICE],
  brand: {
    apple: false,
    samsung: false,
    nokia: false,
    google: false,
    sony: false,
    xiaomi: false,
  },
  memory: {
    below4gb: false,
    from8gb: false,
    from16gb: false,
    from32gb: false,
    from128gb: false,
    from256gb: false,
    from512gbOrAbove: false,
  },
  ram: {
    below1gb: false,
    from1gbTo2gb: false,
    from2gbTo4gb: false,
    from4gbTo6gb: false,
    from8gbTo12gb: false,
    from12gbTo16gb: false,
    above16gb: false,
  },
  ratings: {
    from5Stars: false,
    from4Stars: false,
    from3Stars: false,
  },
  screenSize: {
    below4: false,
    from4To49: false,
    from5To59: false,
    from6To69: false,
    above7: false,
  },
};

export const initialSearchResultState = {
  // oneOf(["PRICE_ASC", "PRICE_DESC", "NAME_ASC", "NAME_DESC"])
  sortBy: "NAME_ASC",
  pageLimit: 8,
  currentPage: 1,
  allResults: [],
  nPages: 0,
  collapsedFilterPanels: [],
  filterOptions: defaultFilterOptions,
  isLoading: false,
};

export const phoneSearchResultReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SEARCH_RESULT": {
      return {
        ...state,
        allResults: action.payload,
        nPages: getTotalPages(action.payload.length, state.pageLimit),
        isLoading: false,
      };
    }
    case "CHANGE_SORT_METHOD": {
      return {
        ...state,
        sortBy: action.payload,
      };
    }
    case "CHANGE_PAGE": {
      return {
        ...state,
        currentPage: +action.payload,
      };
    }
    case "CHANGE_PAGE_LIMIT": {
      return {
        ...state,
        currentPage: 1,
        pageLimit: +action.payload,
        nPages: getTotalPages(state.allResults.length, +action.payload),
      };
    }
    case "COLLAPSE_FILTER_PANEL": {
      return {
        ...state,
        collapsedFilterPanels: [...state.collapsedFilterPanels, action.payload],
      };
    }
    case "EXPAND_FILTER_PANEL": {
      return {
        ...state,
        collapsedFilterPanels: state.collapsedFilterPanels.filter(
          (item) => item !== action.payload
        ),
      };
    }
    case "CHANGE_FILTER_OPTION_VALUE": {
      return {
        ...state,
        filterOptions: action.payload,
      };
    }
    case "CLEAR_ALL_OPTIONS": {
      return {
        ...state,
        filterOptions: defaultFilterOptions,
        collapsedFilterPanels: [],
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
};
