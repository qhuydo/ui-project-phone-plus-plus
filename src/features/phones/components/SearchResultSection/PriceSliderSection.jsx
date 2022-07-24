import {
  Box,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import formatNumberToVND from "utils/currency-formatter";
import { Controller, useFormContext } from "react-hook-form";
import { MAX_PRICE, MIN_PRICE, PRICE_STEP } from "utils/constants";
import NumberFormat from "react-number-format";
import { useState } from "react";
import { useDebounce } from "hooks";

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

/*TODO refactor me*/
const PriceSliderSection = () => {
  const { control, getValues, setValue /*, watch*/ } = useFormContext();

  const [priceRange, setPriceRange] = useState(getValues("priceRange"));
  const debouncedPriceRange = useDebounce(priceRange, 100);

  const onSliderChanged = useCallback((e, value) => {
    setPriceRange(value);
  }, []);

  useEffect(() => {
    setValue("priceRange", debouncedPriceRange);
  }, [debouncedPriceRange, setValue]);

  return (
    <Box sx={PriceContainer}>
      <Typography variant={"h6"}>Price</Typography>
      <Box width={1} alignItems="space-between" display="flex">
        <Slider
          getAriaLabel={() => "Price range"}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          disableSwap
          min={MIN_PRICE}
          step={PRICE_STEP}
          max={MAX_PRICE}
          value={priceRange}
          onChange={onSliderChanged}
          sx={{ color: "primary.dark" }}
        />
      </Box>

      <Stack
        sx={FromToInputContainer}
        component="form"
        noValidate
        autoComplete="off"
        direction="row"
        justifyContent="center"
      >
        <Controller
          control={control}
          name="priceRange"
          rules={{
            validate: (value) => +value[0] <= +value[1],
          }}
          render={({ field: props }) => (
            <NumberFormat
              id="price-input-from"
              size="small"
              customInput={TextField}
              margin="normal"
              displayType="input"
              label="From"
              thousandSeparator={"."}
              decimalSeparator={","}
              fullWidth={false}
              width="auto"
              sx={{ mr: 0.5 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">₫</InputAdornment>,
              }}
              {...props}
              // eslint-disable-next-line react/prop-types
              value={props.value[0]}
              onChange={() => {}}
              onValueChange={(v) => {
                // eslint-disable-next-line react/prop-types
                const priceRange = [+v.value, props.value[1]];
                setValue("priceRange", priceRange);
                setPriceRange(priceRange);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="priceRange"
          rules={{
            validate: (value) => +value[0] <= +value[1],
          }}
          render={({ field: props }) => (
            <NumberFormat
              id="price-input-to"
              size="small"
              customInput={TextField}
              margin="normal"
              displayType="input"
              label="To"
              thousandSeparator={"."}
              decimalSeparator={","}
              fullWidth={false}
              InputProps={{
                endAdornment: <InputAdornment position="end">₫</InputAdornment>,
              }}
              sx={{ ml: 0.5 }}
              {...props}
              // eslint-disable-next-line react/prop-types
              value={props.value[1]}
              onChange={() => {}}
              onValueChange={(v) => {
                // eslint-disable-next-line react/prop-types
                const priceRange = [props.value[0], +v.value];
                setValue("priceRange", priceRange);
                setPriceRange(priceRange);
              }}
            />
          )}
        />
      </Stack>
    </Box>
  );
};

export default PriceSliderSection;
