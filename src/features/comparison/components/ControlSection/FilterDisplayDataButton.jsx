import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListSubheader,
  Menu,
  Stack,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useDebounce } from "hooks";
import { useCallback, useMemo, useState } from "react";
import { SearchBar } from "components/SearchBar";
import { usePhoneComparisonContext } from "features/comparison/context";

const FilterDisplayDataButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpened = useMemo(() => !!anchorEl, [anchorEl]);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const {
    state: { displayedFields },
    changeDisplayedField,
    clearFilters,
  } = usePhoneComparisonContext();

  const onSearchKeyChanged = useCallback((e) => {
    setKeyword(e.currentTarget.value);
  }, []);

  const clearKeyword = useCallback(() => {
    setKeyword("");
  }, []);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClear = useCallback(() => {
    clearFilters();
    handleClose();
    clearKeyword();
  }, [clearFilters, clearKeyword, handleClose]);

  const handleFilterItemValueChanged = useCallback(
    (e) => {
      if (!e.target?.value) return;
      const values = e.target.value.split("__");
      if (values.length < 2) return;

      changeDisplayedField(values[0], values[1], e.target.checked);
    },
    [changeDisplayedField]
  );

  const filteredFields = useMemo(() => {
    const trimmedKeyword = debouncedKeyword.toLowerCase().trim();
    return Object.entries(displayedFields).reduce(
      (map, [sectionName, fields]) => {
        map[sectionName] = Object.entries(fields).reduce(
          (fieldMap, [fieldName, fieldValue]) => {
            if (fieldName.toLowerCase().includes(trimmedKeyword)) {
              fieldMap[fieldName] = fieldValue;
            }
            return fieldMap;
          },
          {}
        );
        return map;
      },
      {}
    );
  }, [debouncedKeyword, displayedFields]);

  return (
    <>
      <Button
        id="phone-comparison-filter-button"
        aria-controls={
          isMenuOpened ? "phone-comparison-filter-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={isMenuOpened ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: isMenuOpened ? "primary.main" : "text.primary",
          borderColor: isMenuOpened ? null : "divider",
          minHeight: 52,
        }}
        variant="outlined"
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>

      <Menu
        id="phone-comparison-filter-menu"
        aria-labelledby="phone-comparison-filter-button"
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack
          direction="column"
          spacing={1}
          p={1}
          xs={{ bgcolor: "background.paper" }}
        >
          <Box display="flex" width={360} height={44}>
            <SearchBar
              value={keyword}
              onSearchKeyChanged={onSearchKeyChanged}
              onCleared={clearKeyword}
              sx={{ m: 0 }}
              placeholder={"Search filter..."}
            />
          </Box>

          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 210,
              "& ul": { py: 1, px: 0 },
            }}
            subheader={<li />}
          >
            {Object.entries(filteredFields).map(([sectionName, fields]) => (
              <li key={`section-${sectionName}`}>
                <ul>
                  <ListSubheader
                    sx={{
                      color: "text.primary",
                      typography: "h6",
                      bgcolor: "background.paper",
                    }}
                  >{`${sectionName.replaceAll("&amp;", "&")}`}</ListSubheader>
                  {Object.entries(fields).map(([fieldName, fieldValue]) => (
                    <ListItem
                      key={`item-${fieldName}`}
                      dense
                      sx={{
                        color: fieldValue ? "primary.main" : "text.primary",
                        "&:hover": {
                          bgcolor: "primary.50",
                        },
                        p: 0,
                      }}
                    >
                      <FormControlLabel
                        label={fieldName}
                        color="inherit"
                        sx={{ px: 2, py: 0.5, width: 1 }}
                        control={
                          <Checkbox
                            value={`${sectionName}__${fieldName}`}
                            checked={fieldValue}
                            onChange={handleFilterItemValueChanged}
                          />
                        }
                      />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>

          <Divider />
          <Stack direction="row" spacing={1} justifyContent="end">
            <Button onClick={handleClear}>Clear</Button>

            <Button variant="contained" onClick={handleClose}>
              OK
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </>
  );
};

export default FilterDisplayDataButton;
