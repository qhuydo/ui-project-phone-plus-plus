import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import { getPhoneById } from "features/phones/api";
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
      if (value) {
        dispatch({ type: "ADD_PHONE_DETAILS", payload: value });
      }
    });
  }, [phoneId]);

  const changeColour = useCallback((colour) => {
    dispatch({ type: "CHANGE_COLOUR", payload: colour });
  }, []);

  const changeVersion = useCallback((version) => {
    dispatch({ type: "CHANGE_VERSION", payload: version });
  }, []);

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
      changeColour,
      changeVersion,
    };
  }, [state, changeColour, changeVersion]);

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
