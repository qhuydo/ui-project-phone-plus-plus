import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  ListItem,
} from "@mui/material";
import { provinces } from "features/payment/assets";
import { usePaymentContext } from "features/payment/context";
import { useState, useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";

// TODO refactor this file
const DeliveryDetailsFormSection = () => {
  const {
    state: {
      contactDetails: {
        billingDetails: { sameAsDeliveryAddress },
      },
    },
  } = usePaymentContext();
  const { control } = useFormContext();
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [communeId, setCommuneId] = useState("");

  const handleProvinceChange = useCallback((event) => {
    setProvinceId(event.target.value);
    setDistrictId("");
    setCommuneId("");
  }, []);

  const handleDistrictChange = useCallback((event) => {
    setDistrictId(event.target.value);
    setCommuneId("");
  }, []);

  const handleCommuneChange = useCallback((event) => {
    setCommuneId(event.target.value);
  }, []);

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h6">Billing details</Typography>

      <ListItem
        dense
        sx={{
          color: sameAsDeliveryAddress ? "primary.main" : "text.primary",
          "&:hover": {
            bgcolor: "primary.50",
          },
          p: 0,
        }}
      >
        <FormControlLabel
          label={"Same as delivery address"}
          color="inherit"
          sx={{ px: 0, width: 1 }}
          control={
            <Controller
              name="billingDetails.sameAsDeliveryAddress"
              control={control}
              render={({ field: props }) => (
                <Checkbox
                  {...props}
                  //eslint-disable-next-line react/prop-types
                  checked={props.value}
                  //eslint-disable-next-line react/prop-types
                  onChange={(e) => props.onChange(e.target.checked)}
                />
              )}
            />
          }
        />
      </ListItem>

      {!sameAsDeliveryAddress && (
        <Stack direction="column" spacing={2}>
          <FormControl required fullWidth>
            <InputLabel id="province-id-label">City/Province</InputLabel>
            <Select
              labelId="province-id-label"
              id="province-id-select"
              value={provinceId}
              label="City/Province"
              onChange={handleProvinceChange}
            >
              {Object.values(provinces).map((c) => (
                <MenuItem value={c.idProvince} key={c.idProvince}>
                  <Typography> {c.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2} width={1}>
            <FormControl required sx={{ width: 0.5 }}>
              <InputLabel id="district-id-label">District/Town</InputLabel>
              <Select
                labelId="district-id-label"
                id="district-id-select"
                value={districtId}
                label="District/Town"
                onChange={handleDistrictChange}
              >
                {provinces[provinceId]
                  ? Object.values(provinces[provinceId].districts).map((d) => (
                      <MenuItem value={d.idDistrict} key={d.idDistrict}>
                        <Typography> {d.name}</Typography>
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>

            <FormControl required sx={{ width: 0.5 }}>
              <InputLabel id="commune-id-label">Ward/Commune</InputLabel>
              <Select
                labelId="commune-id-label"
                id="commune-id-select"
                value={communeId}
                label="Ward/Commune"
                onChange={handleCommuneChange}
              >
                {provinces[provinceId]?.districts[districtId]
                  ? Object.values(
                      provinces[provinceId].districts[districtId].communes
                    ).map((c) => (
                      <MenuItem value={c.idCommune} key={c.idCommune}>
                        <Typography> {c.name}</Typography>
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
          </Stack>

          <TextField variant="outlined" required label="Street" />
          <TextField
            variant="outlined"
            label="Customer notes (optional)"
            multiline
          />
        </Stack>
      )}
    </Stack>
  );
};

export default DeliveryDetailsFormSection;
