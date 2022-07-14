import { Box, Slider, TextField, Typography } from "@mui/material";
import React from "react";
import formatNumberToVND from "utils/currency-formatter";

const PriceContainer = {
  display: "flex",
  flexDirection: "column",
  width: 1,
};

const FromToInputContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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
      <Box sx={{ width: 1 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          disableSwap
          min={0}
          step={1}
          max={50000000}
        />
      </Box>
      <Box
        sx={FromToInputContainer}
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-number"
          label="From"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-number"
          label="To"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </Box>
  );
};

export default PriceSliderSection;
