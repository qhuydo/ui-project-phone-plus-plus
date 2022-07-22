import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { getAvgRatings } from "features/phones/utils";

const PhoneCardContext = createContext({
  phone: null,
  selectedColour: {},
  selectedVersion: {},
  selectedThumbnail: null,
  priceOffPercentage: 0,
  changeColour: () => {},
  changeVersion: () => {},
  pushSale: null,
  avgRating: 0,
});

export const usePhoneCardContext = () => {
  return useContext(PhoneCardContext);
};

export const PhoneCardContextProvider = ({ phone, pushSale, children }) => {
  const [selectedColour, setSelectedColour] = useState(phone.colours[0]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(phone.thumbnail);
  const [selectedVersion, setSelectedVersion] = useState(phone.versions[0]);
  const [priceOffPercentage, setPriceOffPercentage] = useState(() => {
    const firstVersion = phone.versions[0];
    const originalPrice = +firstVersion.originalPrice;
    const salePrice = +firstVersion.salePrice;

    if (originalPrice === salePrice) return 0;

    return ((originalPrice - salePrice) / originalPrice) * 100;
  });

  const avgRating = useMemo(() => {
    return getAvgRatings(phone.comments);
  }, [phone.comments]);

  const changeColour = useCallback((colour) => {
    if (colour) {
      setSelectedColour(colour);
      setSelectedThumbnail(colour.thumbnail);
    }
  }, []);

  const changeVersion = useCallback((version) => {
    if (!version) return;
    setSelectedVersion(version);
    const originalPrice = +version.originalPrice;
    const salePrice = +version.salePrice;

    const percentOff =
      originalPrice === salePrice
        ? 0
        : ((originalPrice - salePrice) / originalPrice) * 100;

    setPriceOffPercentage(percentOff);
  }, []);

  const value = useMemo(() => {
    return {
      phone,
      selectedVersion,
      selectedColour,
      selectedThumbnail,
      priceOffPercentage,
      avgRating,
      changeColour,
      changeVersion,
      pushSale,
    };
  }, [
    phone,
    selectedVersion,
    selectedColour,
    selectedThumbnail,
    priceOffPercentage,
    avgRating,
    changeColour,
    changeVersion,
    pushSale,
  ]);

  return (
    <PhoneCardContext.Provider value={value}>
      {children}
    </PhoneCardContext.Provider>
  );
};

PhoneCardContextProvider.defaultProps = {
  pushSale: null,
};

PhoneCardContextProvider.propTypes = {
  phone: PropTypes.object,
  children: PropTypes.element,
  pushSale: PropTypes.object,
};
