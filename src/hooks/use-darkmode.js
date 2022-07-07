import useLocalStorage from "./use-local-storage";
import useMediaQuery from "./use-media-query";
import useUpdateEffect from "./use-update-effect";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

/**
 * This React Hook offers you an interface to enable, disable, toggle
 * and read the dark theme mode. The returned value (isDarkMode) is a
 * boolean to let you be able to use with your logic.
 * @see https://usehooks-ts.com/react-hook/use-dark-mode
 */
export function useDarkMode() {
  // temporarily disable system dark mode
  // const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const isDarkOS = false;

  const [isDarkMode, setDarkMode] = useLocalStorage(
    "dark-mode-enabled",
    isDarkOS ? isDarkOS : false
  );

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS]);

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
}
