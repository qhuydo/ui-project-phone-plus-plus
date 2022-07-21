import PropTypes from "prop-types";
import { SearchBarContainer } from "components/SearchBar/SearchBarContainer";
import { SearchIconWrapper } from "components/SearchBar/SearchIconWrapper";
import SearchIcon from "@mui/icons-material/Search";
import { StyledInputBase } from "components/SearchBar/SearchInputBase";
import { Zoom } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({
  onKeyPressed,
  onSearchKeyChanged,
  value,
  onBlurred,
  onFocused,
  onCleared,
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
        <Zoom in={value.length === 0}>
          <SearchIcon onClick={onKeyPressed} />
        </Zoom>
      </SearchIconWrapper>

      <SearchIconWrapper>
        <Zoom in={value.length !== 0}>
          <ClearIcon onClick={onCleared} />
        </Zoom>
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
  onCleared: PropTypes.func,
};

export default SearchBar;
