import { useState, useCallback } from "react";

export const useAccordion = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const handleChange = useCallback((event, isExpanded) => {
    setIsOpen(isExpanded);
  }, []);

  return { isOpen, setIsOpen, handleChange };
};
