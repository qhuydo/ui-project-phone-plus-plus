import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { provinces } from "features/payment/assets";
import { usePaymentContext } from "features/payment/context";
import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";

// TODO: refactor this file
const DeliveryDetailsFormSection = () => {
  const {
    state: {
      contactDetails: {
        deliveryDetails: { provinceId, districtId },
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
      setValue("deliveryDetails.provinceId", event.target.value);
      setValue("deliveryDetails.districtId", "");
      setValue("deliveryDetails.communeId", "");
    },
    [setValue]
  );

  const handleDistrictChange = useCallback(
    (event) => {
      setValue("deliveryDetails.districtId", event.target.value);
      setValue("deliveryDetails.communeId", "");
    },
    [setValue]
  );

  const handleCommuneChange = useCallback(
    (event) => {
      setValue("deliveryDetails.communeId", event.target.value);
    },
    [setValue]
  );

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="column" spacing={0.5} pb={1}>
        <Typography variant="h6">Delivery details</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Delivery is available within Vietnam
        </Typography>
      </Stack>

      <Stack direction="column" spacing={2}>
        <FormControl required fullWidth>
          <InputLabel id="province-id-label">City/Province</InputLabel>
          <Controller
            control={control}
            name="deliveryDetails.provinceId"
            rules={{
              required: "Please choose a province",
            }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="province-id-label"
                id="province-id-select"
                label="City/Province"
                onChange={handleProvinceChange}
                error={!!errors["deliveryDetails"]?.["provinceId"]}
              >
                {Object.values(provinces).map((c) => (
                  <MenuItem value={c.idProvince} key={c.idProvince}>
                    <Typography> {c.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors["deliveryDetails"]?.["provinceId"] && (
            <Typography variant="caption" color="error" m="3px 14px">
              {errors["deliveryDetails"]?.["provinceId"]?.message}
            </Typography>
          )}
        </FormControl>

        <Stack direction="row" spacing={2} width={1}>
          <FormControl required sx={{ width: 0.5 }}>
            <InputLabel id="district-id-label">District/Town</InputLabel>
            <Controller
              control={control}
              name="deliveryDetails.districtId"
              rules={{
                required: "Please choose a district",
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="district-id-label"
                  id="district-id-select"
                  label="District/Town"
                  onChange={handleDistrictChange}
                  error={!!errors["deliveryDetails"]?.["districtId"]}
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
            {errors["deliveryDetails"]?.["districtId"] && (
              <Typography variant="caption" color="error" m="3px 14px">
                {errors["deliveryDetails"]?.["districtId"]?.message}
              </Typography>
            )}
          </FormControl>

          <FormControl required sx={{ width: 0.5 }}>
            <InputLabel id="commune-id-label">Ward/Commune</InputLabel>
            <Controller
              control={control}
              name="deliveryDetails.communeId"
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="commune-id-label"
                  id="commune-id-select"
                  label="Ward/Commune"
                  onChange={handleCommuneChange}
                  error={!!errors["deliveryDetails"]?.["communeId"]}
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
            {errors["deliveryDetails"]?.["communeId"] && (
              <Typography variant="caption" color="error" m="3px 14px">
                {errors["deliveryDetails"]?.["communeId"]?.message}
              </Typography>
            )}
          </FormControl>
        </Stack>

        <Controller
          control={control}
          name="deliveryDetails.street"
          rules={{
            required: "This field is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              required
              label="Street"
              error={!!errors["deliveryDetails"]?.["street"]}
              helperText={errors["deliveryDetails"]?.["street"]?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="deliveryDetails.customerNotes"
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="Customer notes (optional)"
              multiline
            />
          )}
        />
      </Stack>
    </Stack>
  );
};

export default DeliveryDetailsFormSection;
