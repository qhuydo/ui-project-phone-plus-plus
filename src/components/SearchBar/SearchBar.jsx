import PropTypes from "prop-types";
import { SearchBarContainer } from "components/SearchBar/SearchBarContainer";
import { SearchIconWrapper } from "components/SearchBar/SearchIconWrapper";
import SearchIcon from "@mui/icons-material/Search";
import { StyledInputBase } from "components/SearchBar/SearchInputBase";

const SearchBar = ({
  onKeyPressed,
  onSearchKeyChanged,
  value,
  onBlurred,
  onFocused,
}) => {
  return (
    <SearchBarContainer>
      <StyledInputBase
        placeholder="Search for something…"
        inputProps={{ "aria-label": "search" }}
        onKeyPress={onKeyPressed}
        value={value}
        onChange={onSearchKeyChanged}
        onFocus={onFocused}
        onBlur={onBlurred}
      />

      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  onKeyPressed: PropTypes.func,
  onSearchKeyChanged: PropTypes.func,
  value: PropTypes.string,
  onFocused: PropTypes.func,
  onBlurred: PropTypes.func,
};

export default SearchBar;
