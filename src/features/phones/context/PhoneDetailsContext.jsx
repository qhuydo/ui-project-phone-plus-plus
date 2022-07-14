import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPhoneById } from "features/phones/api";

const PhoneDetailsContext = createContext({
  phoneDetails: null,
  selectedColour: null,
  selectedVersion: null,
  isLoading: false,
});

export const usePhoneDetailsContext = () => {
  return useContext(PhoneDetailsContext);
};

export const PhoneDetailsContextProvider = ({ phoneId, children }) => {
  const [phone, setPhone] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPhoneById(phoneId).then((value) => {
      setIsLoading(false);
      if (value) {
        setPhone(value);
      }
    });
  }, [phoneId]);

  return (
    <PhoneDetailsContext.Provider
      value={{ phoneDetails: phone, isLoading: isLoading }}
    >
      {children}
    </PhoneDetailsContext.Provider>
  );
};

PhoneDetailsContextProvider.propTypes = {
  phoneId: PropTypes.string,
  children: PropTypes.element,
};
