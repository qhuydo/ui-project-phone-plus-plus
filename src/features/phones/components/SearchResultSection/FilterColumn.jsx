import { Stack } from "@mui/material";
import FilterHeader from "./FilterHeader";
import FilterOptions from "./FilterOptions";
import PriceSliderSection from "./PriceSliderSection";

const FilterColumn = () => {
  return (
    <Stack direction="column" spacing={1} alignItems="center" width={1}>
      <FilterHeader />
      <PriceSliderSection />
      <FilterOptions />
    </Stack>
  );
};

export default FilterColumn;
