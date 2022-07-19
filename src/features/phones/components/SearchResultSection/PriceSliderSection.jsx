import { Box, Slider, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import formatNumberToVND from "utils/currency-formatter";

const PriceContainer = {
  display: "flex",
  flexDirection: "column",
  width: 1,
};

const FromToInputContainer = {
  alignItems: "space-between",
  justifyContent: "center",
  width: 1,
};

function valueLabelFormat(value) {
  return `${formatNumberToVND(value)}`;
}

const PriceSliderSection = () => {
  const [value, setValue] = React.useState([1000000, 40000000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={PriceContainer}>
      <Typography variant={"h6"}>Price</Typography>
      <Box width={1} alignItems="space-between" display="flex">
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          disableSwap
          min={0}
          step={1}
          max={50_000_000}
        />
      </Box>

      <Stack
        sx={FromToInputContainer}
        component="form"
        noValidate
        autoComplete="off"
        direction="row"
        spacing={1}
        mt={1}
      >
        <TextField
          id="outlined-number"
          size="small"
          label="From"
          type="number"
          fullWidth={false}
        />

        <TextField
          id="standard-number"
          label="To"
          type="number"
          size="small"
          fullWidth={false}
        />
      </Stack>
    </Box>
  );
};

export default PriceSliderSection;
