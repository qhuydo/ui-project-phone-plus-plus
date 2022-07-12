import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";

const PhoneCardContext = createContext({
  phone: null,
  selectedColour: {},
  selectedVersion: {},
  selectedThumbnail: null,
  priceOffPercentage: 0,
  changeColour: () => {},
  changeVersion: () => {},
});

export const usePhoneCardContext = () => {
  return useContext(PhoneCardContext);
};

export const PhoneCardContextProvider = ({ phone, children }) => {
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
      changeColour,
      changeVersion,
    };
  }, [
    changeColour,
    changeVersion,
    phone,
    selectedColour,
    selectedThumbnail,
    selectedVersion,
    priceOffPercentage,
  ]);

  return (
    <PhoneCardContext.Provider value={value}>
      {children}
    </PhoneCardContext.Provider>
  );
};

PhoneCardContextProvider.propTypes = {
  phone: PropTypes.object,
  children: PropTypes.element,
};
