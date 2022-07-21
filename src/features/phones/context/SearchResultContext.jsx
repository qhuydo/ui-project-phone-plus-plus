import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import {
  initialSearchResultState,
  phoneSearchResultReducer,
} from "features/phones/stores";

const SearchResultContext = createContext({
  state: initialSearchResultState,
  dispatch: () => {},
});

export const useSearchResultContext = () => {
  return useContext(SearchResultContext);
};

export const SearchResultContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    phoneSearchResultReducer,
    initialSearchResultState
  );

  const changeSortMethod = useCallback((e) => {
    // console.log(e.target.value);
    dispatch({ type: "CHANGE_SORT_METHOD", payload: e.target.value });
  }, []);

  const changePageLimit = useCallback((e) => {
    // console.log(e.target.value);
    dispatch({ type: "CHANGE_PAGE_LIMIT", payload: +e.target.value });
  }, []);

  const addSearchResult = useCallback((results) => {
    dispatch({ type: "ADD_SEARCH_RESULT", payload: results });
  }, []);

  const changePage = useCallback((page) => {
    dispatch({ type: "CHANGE_PAGE", payload: page });
  }, []);

  const changeFilterPanelCollapseState = useCallback(
    (option) => (event, newExpanded) => {
      if (!newExpanded) {
        dispatch({ type: "COLLAPSE_FILTER_PANEL", payload: option.name });
      } else {
        dispatch({ type: "EXPAND_FILTER_PANEL", payload: option.name });
      }
    },
    []
  );

  const changeFilterOptionValues = useCallback((filterOptions) => {
    dispatch({ type: "CHANGE_FILTER_OPTION_VALUE", payload: filterOptions });
  }, []);

  const clearAllFilterOptions = useCallback(() => {
    dispatch({ type: "CLEAR_ALL_OPTIONS" });
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      changeSortMethod,
      changePageLimit,
      addSearchResult,
      changePage,
      changeFilterPanelCollapseState,
      changeFilterOptionValues,
      clearAllFilterOptions,
    }),
    [
      state,
      changeSortMethod,
      changePageLimit,
      addSearchResult,
      changePage,
      changeFilterPanelCollapseState,
      changeFilterOptionValues,
      clearAllFilterOptions,
    ]
  );

  return (
    <SearchResultContext.Provider value={contextValue}>
      {children}
    </SearchResultContext.Provider>
  );
};

SearchResultContextProvider.propTypes = {
  children: PropTypes.element,
};
