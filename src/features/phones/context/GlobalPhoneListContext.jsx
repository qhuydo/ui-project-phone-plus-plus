import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { allPhones } from "features/phones/assets";

const initialValue = {
  favourites: {},
  history: [],
  toggleFavourite: () => {},
};

const GlobalPhoneListContext = createContext(initialValue);

export const useFavouritePhoneMap = () => {
  const context = useContext(GlobalPhoneListContext);
  return [context.favourites, context.toggleFavourite];
};

export const GlobalListProvider = ({ children }) => {
  const [favouriteList, setFavouriteList] = useState(() =>
    allPhones.reduce((map, item) => {
      map[item.id] = false;
      return map;
    }, {})
  );

  const [historyList, setHistoryList] = useState([]);

  const toggleFavourite = useCallback(
    (id) =>
      setFavouriteList({
        ...favouriteList,
        [id]: !favouriteList[id],
      }),
    [favouriteList]
  );

  const addToHistoryList = useCallback(
    (phone) =>
      setHistoryList([
        phone,
        ...historyList.filter((item) => item.id !== phone.id),
      ]),
    [historyList]
  );

  // console.log(favouriteList);

  const contextValue = useMemo(() => {
    return {
      favourites: favouriteList,
      history: historyList,
      toggleFavourite,
      addToHistoryList,
    };
  }, [favouriteList, historyList, toggleFavourite, addToHistoryList]);

  return (
    <GlobalPhoneListContext.Provider value={contextValue}>
      {children}
    </GlobalPhoneListContext.Provider>
  );
};

GlobalListProvider.propTypes = {
  children: PropTypes.element,
};
