import { Stack, Typography } from "@mui/material";
import FilterDisplayDataButton from "features/comparison/components/ControlSection/FilterDisplayDataButton";
import ComparisonModeButton from "features/comparison/components/ControlSection/ComparisonModeButton";
import { usePhoneComparisonContext } from "features/comparison/context";
import ComparisonSearchBar from "features/comparison/components/ControlSection/ComparisonSearchBar";

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
        <ComparisonSearchBar />

        <FilterDisplayDataButton />
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ opacity: 0 }}
      >
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
