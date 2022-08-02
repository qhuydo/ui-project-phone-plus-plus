import { useState, useCallback } from "react";

export const useAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback((event, isExpanded) => {
    setIsOpen(isExpanded);
  }, []);

  return { isOpen, setIsOpen, handleChange };
};
