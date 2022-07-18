import { getTotalPages } from "features/phones/utils";

export const initialSearchResultState = {
  // sortBy: "RELEVANCE",
  sortBy: "NAME_ASC",
  pageLimit: 8,
  currentPage: 1,
  allResults: [],
  nPages: 0,
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
    default:
      return state;
  }
};
