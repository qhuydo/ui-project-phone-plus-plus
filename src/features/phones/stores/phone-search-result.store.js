import { getTotalPages } from "features/phones/utils";

export const initialSearchResultState = {
  // sortBy: "RELEVANCE",
  sortBy: "NAME_ASC",
  pageLimit: 8,
  currentPage: 1,
  allResults: [],
  nPages: 0,
  collapsedFilterPanels: [],
  filterOptions: {
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
      all: false,
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
  },
};

export const phoneSearchResultReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SEARCH_RESULT": {
      return {
        ...state,
        allResults: action.payload,
        nPages: getTotalPages(action.payload.length, state.pageLimit),
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
    default:
      return state;
  }
};
