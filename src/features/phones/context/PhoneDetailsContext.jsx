import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import { getPhoneById, getRecommendedPhones } from "features/phones/api";
import {
  initialPhoneDetailsState,
  phoneDetailsReducer,
} from "features/phones/stores/phone-details.store";

const PhoneDetailsContext = createContext({
  state: initialPhoneDetailsState,
  dispatch: () => {},
});

export const usePhoneDetailsContext = () => {
  return useContext(PhoneDetailsContext);
};

export const PhoneDetailsContextProvider = ({ phoneId, children }) => {
  const [state, dispatch] = useReducer(
    phoneDetailsReducer,
    initialPhoneDetailsState
  );

  useEffect(() => {
    dispatch({ type: "NOTIFY_LOADING" });
    getPhoneById(phoneId).then((value) => {
      dispatch({ type: "NOTIFY_LOADED" });

      dispatch({ type: "ADD_PHONE_DETAILS", payload: value });
    });

    getRecommendedPhones(phoneId).then((value) => {
      dispatch({ type: "ADD_RECOMMENDED_PHONES", payload: value });
    });
  }, [phoneId]);

  const changeColour = useCallback((colour) => {
    dispatch({ type: "CHANGE_COLOUR", payload: colour });
  }, []);

  const changeVersion = useCallback((version) => {
    dispatch({ type: "CHANGE_VERSION", payload: version });
  }, []);

  const changeQuantity = useCallback((quantity) => {
    dispatch({ type: "CHANGE_QUANTITY", payload: quantity });
  }, []);

  const changeSpecOpenState = useCallback((isOpen) => {
    dispatch({ type: "CHANGE_SPEC_OPEN_STATE", payload: isOpen });
  }, []);

  const addCommentFilter = useCallback(
    (value) => {
      dispatch({
        type: "CHANGE_FILTERS",
        payload: [...state.filterCommentBy, value],
      });
    },
    [state.filterCommentBy]
  );

  const removeCommentFilter = useCallback(
    (value) => {
      dispatch({
        type: "CHANGE_FILTERS",
        payload: state.filterCommentBy.filter((item) => item !== value),
      });
    },
    [state.filterCommentBy]
  );

  const changeCommentPage = useCallback((page) => {
    dispatch({ type: "CHANGE_COMMENT_PAGE", payload: page });
  }, []);

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
      changeColour,
      changeVersion,
      changeQuantity,
      changeSpecOpenState,
      addCommentFilter,
      removeCommentFilter,
      changeCommentPage,
    };
  }, [
    state,
    changeColour,
    changeVersion,
    changeQuantity,
    changeSpecOpenState,
    addCommentFilter,
    removeCommentFilter,
    changeCommentPage,
  ]);

  return (
    <PhoneDetailsContext.Provider value={contextValue}>
      {children}
    </PhoneDetailsContext.Provider>
  );
};

PhoneDetailsContextProvider.propTypes = {
  phoneId: PropTypes.string,
  children: PropTypes.element,
};
