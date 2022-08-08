import { getPhoneById, getRecommendedPhones } from "features/phones/api";
import {
  initialPhoneDetailsState,
  phoneDetailsReducer,
} from "features/phones/stores/phone-details.store";
import { filterCommentAsync } from "features/phones/utils";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

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

  const changeCommentFilter = useCallback(
    async (value) => {
      if (value) {
        dispatch({
          type: "CHANGE_COMMENT_FILTER",
          payload: value,
        });

        const filteredComments = await filterCommentAsync(
          state.phoneDetails.comments ?? [],
          value
        );

        dispatch({
          type: "UPDATE_COMMENTS",
          payload: filteredComments,
        });
      }
    },
    [state.phoneDetails?.comments]
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
      changeCommentFilter,
      changeCommentPage,
    };
  }, [
    state,
    changeColour,
    changeVersion,
    changeQuantity,
    changeSpecOpenState,
    changeCommentFilter,
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
