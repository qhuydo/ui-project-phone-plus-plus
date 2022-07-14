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
    console.log(e.target.value);
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

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      changeSortMethod,
      changePageLimit,
      addSearchResult,
      changePage,
    }),
    [state, changeSortMethod, changePageLimit, addSearchResult, changePage]
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
