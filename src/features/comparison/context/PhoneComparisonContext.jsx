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
  MAX_ITEMS_PER_COMPARISON,
} from "features/comparison/utils";
import { shuffle } from "lodash-es";
import { allPhones } from "features/phones/assets";
import { Router } from "routes";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

  const changeViewMode = useCallback((e, value) => {
    dispatch({ type: "CHANGE_VIEW_MODE", payload: value });
  }, []);

  const addPhone = useCallback(
    (id) => {
      let phonesIds;
      if (state.phoneDetails.length >= MAX_ITEMS_PER_COMPARISON) {
        phonesIds = [
          ...state.phoneDetails
            .slice(0, MAX_ITEMS_PER_COMPARISON - 1)
            .map((phone) => phone.id),
          id,
        ];
      } else {
        phonesIds = [...state.phoneDetails.map((phone) => phone.id), id];
      }
      navigate(Router.getPhoneComparePage(phonesIds));
    },
    [navigate, state.phoneDetails]
  );

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      changeComparisonMode,
      changeDisplayedField,
      changeViewMode,
      addPhone,
    }),
    [
      addPhone,
      changeComparisonMode,
      changeDisplayedField,
      changeViewMode,
      state,
    ]
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
