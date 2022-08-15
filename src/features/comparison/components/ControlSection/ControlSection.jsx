import { Stack } from "@mui/material";
import ComparisonSearchBar from "features/comparison/components/ControlSection/ComparisonSearchBar";
import FilterDisplayDataButton from "features/comparison/components/ControlSection/FilterDisplayDataButton";

const ControlSection = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" width={1} py={2}>
      <ComparisonSearchBar />

      <FilterDisplayDataButton />
    </Stack>
  );
};

export default ControlSection;
