import { Box, Stack, Typography } from "@mui/material";
import { SearchBar } from "components/SearchBar";
import FilterDisplayDataButton from "features/comparison/components/ControlSection/FilterDisplayDataButton";
import ComparisonModeButton from "features/comparison/components/ControlSection/ComparisonModeButton";
import { usePhoneComparisonContext } from "features/comparison/context";

const ControlSection = () => {
  const {
    state: { comparisonMode },
    changeComparisonMode,
  } = usePhoneComparisonContext();

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="space-between"
      width={1}
      py={2}
    >
      <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
        <Box width={0.74} display="flex">
          <SearchBar
            value={""}
            placeholder={"Search for phone to compare..."}
            sx={{ m: 0 }}
          />
        </Box>

        <FilterDisplayDataButton />
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6">Comparison mode</Typography>
        <ComparisonModeButton
          value={comparisonMode}
          onChange={changeComparisonMode}
        />
      </Stack>
    </Stack>
  );
};

export default ControlSection;
