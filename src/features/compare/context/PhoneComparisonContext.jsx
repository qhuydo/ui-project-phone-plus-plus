import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  initialPhoneComparisonState,
  phoneComparisonReducer,
} from "features/compare/store";
import PropTypes from "prop-types";
import { getPhoneById } from "features/phones/api";
import {
  getDisplayedDataFromPhoneDetails,
  getDisplayedFieldsFromPhoneDetails,
} from "features/compare/utils";

const PhoneComparisonContext = createContext({
  state: initialPhoneComparisonState,
  dispatcher: () => {},
});

export const usePhoneComparisonContext = () => {
  return useContext(PhoneComparisonContext);
};

export const PhoneComparisonContextProvider = ({ ids, children }) => {
  const [state, dispatch] = useReducer(
    phoneComparisonReducer,
    initialPhoneComparisonState
  );

  useEffect(() => {
    (async () => {
      dispatch({ type: "SET_LOADING" });

      const phoneDetails = (
        await Promise.all(ids.map((id) => getPhoneById(id)))
      ).filter((item) => !!item);

      const displayedFields = await getDisplayedFieldsFromPhoneDetails(
        phoneDetails
      );

      const displayedData = await getDisplayedDataFromPhoneDetails(
        phoneDetails,
        displayedFields
      );
      console.log({
        phoneDetails,
        displayedFields,
        displayedData,
      });

      dispatch({
        type: "ADD_COMPARISON_DATA",
        payload: {
          phoneDetails,
          displayedFields,
          displayedData,
        },
      });
    })();
  }, [ids]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <PhoneComparisonContext.Provider value={contextValue}>
      {children}
    </PhoneComparisonContext.Provider>
  );
};

PhoneComparisonContextProvider.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.element,
};
