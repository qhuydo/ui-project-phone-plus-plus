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
import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";

// TODO refactor this file
const DeliveryDetailsFormSection = () => {
  const {
    state: {
      contactDetails: {
        billingDetails: { provinceId, districtId, sameAsDeliveryAddress },
      },
    },
  } = usePaymentContext();

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const handleProvinceChange = useCallback(
    (event) => {
      setValue("billingDetails.provinceId", event.target.value);
      setValue("billingDetails.districtId", "");
      setValue("billingDetails.communeId", "");
    },
    [setValue]
  );

  const handleDistrictChange = useCallback(
    (event) => {
      setValue("billingDetails.districtId", event.target.value);
      setValue("billingDetails.communeId", "");
    },
    [setValue]
  );

  const handleCommuneChange = useCallback(
    (event) => {
      setValue("billingDetails.communeId", event.target.value);
    },
    [setValue]
  );

  const handleSelectionChange = useCallback(
    (e) => {
      setValue("billingDetails.sameAsDeliveryAddress", e.target.checked, {
        shouldValidate: true,
      });
      // setValue("billingDetails.provinceId", "");
      // setValue("billingDetails.districtId", "");
      // setValue("", "");
      // clearErrors([
      //   "billingDetails.provinceId",
      //   "billingDetails.districtId",
      //   "billingDetails.communeId",
      // ]);
    },
    [setValue]
  );

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
                  onChange={(e) => handleSelectionChange(e)}
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
            <Controller
              control={control}
              name="billingDetails.provinceId"
              rules={{
                validate: {
                  requiredProvinceValue: (v) =>
                    sameAsDeliveryAddress ||
                    (!sameAsDeliveryAddress && v !== null && v !== undefined) ||
                    "Please choose a province",
                },
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="province-id-label"
                  id="province-id-select"
                  label="City/Province"
                  onChange={handleProvinceChange}
                  error={!!errors["billingDetails"]?.["provinceId"]}
                >
                  {Object.values(provinces).map((c) => (
                    <MenuItem value={c.idProvince} key={c.idProvince}>
                      <Typography> {c.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors["billingDetails"]?.["provinceId"] && (
              <Typography variant="caption" color="error" m="3px 14px">
                {errors["billingDetails"]?.["provinceId"]?.message}
              </Typography>
            )}
          </FormControl>

          <Stack direction="row" spacing={2} width={1}>
            <FormControl required sx={{ width: 0.5 }}>
              <InputLabel id="district-id-label">District/Town</InputLabel>
              <Controller
                control={control}
                name="billingDetails.districtId"
                rules={{
                  validate: {
                    requiredDistrictValue: (v) =>
                      sameAsDeliveryAddress ||
                      (!sameAsDeliveryAddress &&
                        v !== null &&
                        v !== undefined) ||
                      "Please choose a district",
                  },
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="district-id-label"
                    id="district-id-select"
                    label="District/Town"
                    onChange={handleDistrictChange}
                    error={!!errors["billingDetails"]?.["districtId"]}
                  >
                    {provinces[provinceId]
                      ? Object.values(provinces[provinceId]?.districts).map(
                          (d) => (
                            <MenuItem value={d.idDistrict} key={d.idDistrict}>
                              <Typography> {d.name}</Typography>
                            </MenuItem>
                          )
                        )
                      : ""}
                  </Select>
                )}
              />
              {errors["billingDetails"]?.["districtId"] && (
                <Typography variant="caption" color="error" m="3px 14px">
                  {errors["billingDetails"]?.["districtId"]?.message}
                </Typography>
              )}
            </FormControl>

            <FormControl required sx={{ width: 0.5 }}>
              <InputLabel id="commune-id-label">Ward/Commune</InputLabel>
              <Controller
                control={control}
                name="billingDetails.communeId"
                rules={{
                  validate: {
                    requiredCommuneValue: (v) =>
                      sameAsDeliveryAddress ||
                      (!sameAsDeliveryAddress &&
                        v !== null &&
                        v !== undefined) ||
                      "Please choose a commune",
                  },
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="commune-id-label"
                    id="commune-id-select"
                    label="Ward/Commune"
                    onChange={handleCommuneChange}
                    error={!!errors["billingDetails"]?.["communeId"]}
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
                )}
              />
              {errors["billingDetails"]?.["communeId"] && (
                <Typography variant="caption" color="error" m="3px 14px">
                  {errors["billingDetails"]?.["communeId"]?.message}
                </Typography>
              )}
            </FormControl>
          </Stack>

          <Controller
            control={control}
            name="billingDetails.street"
            rules={{
              validate: {
                requiredStreetValue: (v) =>
                  sameAsDeliveryAddress ||
                  (!sameAsDeliveryAddress && v !== null && v !== undefined) ||
                  "This field is required",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                required
                label="Street"
                error={!!errors["billingDetails"]?.["street"]}
                helperText={errors["billingDetails"]?.["street"]?.message}
              />
            )}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default DeliveryDetailsFormSection;
