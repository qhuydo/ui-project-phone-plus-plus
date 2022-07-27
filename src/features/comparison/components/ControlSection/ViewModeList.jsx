import {
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import {
  TABLE_HEADER_MAX_WIDTH,
  VIEW_MODE_TEXTS,
  VIEW_MODES,
} from "features/comparison/utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { usePhoneComparisonContext } from "features/comparison/context";
import { useMemo } from "react";

const ViewModeList = () => {
  const {
    state: { viewMode, phoneDetails },
    changeViewMode,
  } = usePhoneComparisonContext();

  const isDisabled = useMemo(
    () => phoneDetails.length === 0,
    [phoneDetails.length]
  );

  return (
    <Stack
      component={Paper}
      variant="outlined"
      elevation={0}
      width={TABLE_HEADER_MAX_WIDTH}
      direction="column"
      px={1}
      py={2}
      spacing={1}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <VisibilityIcon />
        <Typography variant="h6">View mode</Typography>
      </Stack>
      <Divider />

      <FormControl fullWidth>
        <RadioGroup
          defaultValue={VIEW_MODES[0]}
          value={viewMode}
          name="view-mode-radio-buttons-group"
          onChange={changeViewMode}
        >
          {VIEW_MODES.map((item, idx) => {
            return (
              <FormControlLabel
                key={item}
                value={item}
                disabled={isDisabled}
                control={<Radio />}
                label={
                  <Typography variant="body2" color="inherit">
                    {VIEW_MODE_TEXTS[idx]}
                  </Typography>
                }
                labelPlacement="end"
                sx={{
                  m: 0,
                  "&:hover": {
                    bgcolor: "primary.50",
                    color: "primary.main",
                  },
                  color: "text.primary",
                }}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default ViewModeList;
