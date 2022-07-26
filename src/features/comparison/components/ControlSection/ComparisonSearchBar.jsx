import { SearchBar } from "components/SearchBar";
import { Box } from "@mui/material";
import { useDebounce } from "hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { findPhoneByKeyword } from "features/phones/api";
import SearchResultsMenu from "features/comparison/components/ControlSection/SearchResultsMenu";

const ComparisonSearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);
  const [phoneResults, setPhoneResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchBarRef = useRef(null);

  const onSearchKeyChanged = useCallback((e) => {
    setKeyword(e.currentTarget.value);
  }, []);

  const onKeywordCleared = useCallback(() => {
    setKeyword("");
    setPhoneResults([]);
  }, []);

  const onSearchBarFocused = useCallback(() => {
    if (phoneResults.length !== 0) {
      setShowSearchResults(true);
    }
  }, [phoneResults.length]);

  const onSearchBarOutOfFocused = useCallback(() => {
    setShowSearchResults(false);
  }, []);

  useEffect(() => {
    if (debouncedKeyword.trim().length === 0) {
      setShowSearchResults(false);
      return;
    }

    findPhoneByKeyword(debouncedKeyword).then((value) => {
      if (value && value.length !== 0) {
        setPhoneResults(value);
      }
      const shouldShowResults = !!value && value.length !== 0;
      setShowSearchResults(shouldShowResults);

      return value;
    });
  }, [debouncedKeyword]);

  return (
    <Box width={0.74} display="flex">
      <div
        ref={searchBarRef}
        style={{ display: "flex", width: "100%", position: "relative" }}
      >
        <SearchBar
          value={keyword}
          onCleared={onKeywordCleared}
          onBlurred={onSearchBarOutOfFocused}
          onFocused={onSearchBarFocused}
          onSearchKeyChanged={onSearchKeyChanged}
          placeholder={"Search for phone to compare..."}
          sx={{ m: 0 }}
        />

        <SearchResultsMenu
          searchResults={phoneResults}
          shouldShowSearchMenu={showSearchResults}
        />
      </div>
    </Box>
  );
};

export default ComparisonSearchBar;
