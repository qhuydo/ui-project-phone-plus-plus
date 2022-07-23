import { Box, Button, Stack, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useSearchResultContext } from "features/phones/context";
import { useFormContext } from "react-hook-form";
import { useCallback } from "react";

const FilterHeaderContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: 1,
  pt: 1,
  flexWrap: "wrap",
};

const iconStyle = () => ({
  mr: 1,
  width: "40px",
  height: "40px",
});

const FilterHeader = () => {
  const { clearAllFilterOptions } = useSearchResultContext();
  const { reset } = useFormContext();
  const clearAll = useCallback(() => {
    reset();
    clearAllFilterOptions();
  }, [clearAllFilterOptions, reset]);

  return (
    <Box sx={FilterHeaderContainer}>
      <Stack direction="row">
        <FilterAltOutlinedIcon sx={iconStyle} />
        <Typography variant={"h4"}>Filter</Typography>
      </Stack>
      <Button variant="text" onClick={clearAll}>
        Clear all
      </Button>
    </Box>
  );
};

export default FilterHeader;
