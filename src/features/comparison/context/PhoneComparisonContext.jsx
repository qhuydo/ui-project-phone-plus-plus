import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  initialPhoneComparisonState,
  phoneComparisonReducer,
} from "features/comparison/store";
import PropTypes from "prop-types";
import { getPhoneById } from "features/phones/api";
import {
  getDisplayedDataFromPhoneDetails,
  getDisplayedFieldsFromPhoneDetails,
} from "features/comparison/utils";
import { shuffle } from "lodash-es";
import { allPhones } from "features/phones/assets";

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

      const recommendations = shuffle(allPhones).slice(0, 4);
      // console.log({
      //   phoneDetails,
      //   displayedFields,
      //   displayedData,
      // });

      dispatch({
        type: "ADD_COMPARISON_DATA",
        payload: {
          phoneDetails,
          displayedFields,
          displayedData,
          recommendations,
        },
      });
    })();
  }, [ids]);

  const changeDisplayedField = useCallback(
    (sectionName, fieldName, fieldValue) => {
      if (!sectionName || !fieldName) return;
      try {
        const displayedFields = { ...state.displayedFields };
        displayedFields[sectionName][fieldName] = fieldValue;
        dispatch({ type: "CHANGE_DISPLAYED_FIELDS", payload: displayedFields });
      } catch (e) {
        console.log(e);
      }
    },
    [state?.displayedFields]
  );

  const changeComparisonMode = useCallback((e, mode) => {
    dispatch({ type: "CHANGE_COMPARISON_MODE", payload: mode });
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      changeComparisonMode,
      changeDisplayedField,
    }),
    [changeComparisonMode, changeDisplayedField, state]
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
