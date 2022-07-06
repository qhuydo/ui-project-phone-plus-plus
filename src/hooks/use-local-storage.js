import { useEventCallback } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useEventListener from "./use-event-listener";

// See: https://usehooks-ts.com/react-hook/use-event-listener

/**
 * @param key
 * @param initialValue
 * @see https://usehooks-ts.com/react-hook/use-local-storage
 */
function useLocalStorage(key, initialValue) {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback(() => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useEventCallback((value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event) => {
      if (event.key && event.key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );

  // this only works for other documents, not the current one
  useEventListener("storage", handleStorageChange);

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener("local-storage", handleStorageChange);

  return [storedValue, setValue];
}

export default useLocalStorage;
