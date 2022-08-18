import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  TextField,
} from "@mui/material";
import { provinces } from "features/payment/assets";
import { useRefundContext } from "features/refund/context";
import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";

const UserAddressFormSection = () => {
  const {
    state: {
      refundInfo: { provinceId, districtId },
    },
  } = useRefundContext();

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleProvinceChange = useCallback(
    (event) => {
      setValue("provinceId", event.target.value);
      setValue("districtId", "");
      setValue("communeId", "");
    },
    [setValue]
  );

  const handleDistrictChange = useCallback(
    (event) => {
      setValue("districtId", event.target.value);
      setValue("communeId", "");
    },
    [setValue]
  );

  const handleCommuneChange = useCallback(
    (event) => {
      setValue("communeId", event.target.value);
    },
    [setValue]
  );

  return (
    <Stack direction="column" spacing={2} width={1}>
      <FormControl required fullWidth>
        <InputLabel id="province-id-label">City/Province</InputLabel>
        <Controller
          control={control}
          name="provinceId"
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
              error={!!errors["provinceId"]}
            >
              {Object.values(provinces).map((c) => (
                <MenuItem value={c.idProvince} key={c.idProvince}>
                  <Typography> {c.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors["provinceId"] && (
          <Typography variant="caption" color="error" m="3px 14px">
            {errors["provinceId"]?.message}
          </Typography>
        )}
      </FormControl>

      <Stack direction="row" spacing={2} width={1}>
        <FormControl required sx={{ width: 0.5 }}>
          <InputLabel id="district-id-label">District/Town</InputLabel>
          <Controller
            control={control}
            name="districtId"
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
                error={!!errors["districtId"]}
              >
                {provinces[provinceId]?.districts
                  ? Object.values(provinces[provinceId]?.districts).map((d) => (
                      <MenuItem value={d.idDistrict} key={d.idDistrict}>
                        <Typography> {d.name}</Typography>
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            )}
          />
          {errors["districtId"] && (
            <Typography variant="caption" color="error" m="3px 14px">
              {errors["districtId"]?.message}
            </Typography>
          )}
        </FormControl>

        <FormControl required sx={{ width: 0.5 }}>
          <InputLabel id="commune-id-label">Ward/Commune</InputLabel>
          <Controller
            control={control}
            name="communeId"
            render={({ field }) => (
              <Select
                {...field}
                labelId="commune-id-label"
                id="commune-id-select"
                label="Ward/Commune"
                onChange={handleCommuneChange}
                error={!!errors["communeId"]}
              >
                {provinces[provinceId]?.districts[districtId]?.communes
                  ? Object.values(
                      provinces[provinceId]?.districts[districtId]?.communes
                    ).map((c) => (
                      <MenuItem value={c.idCommune} key={c.idCommune}>
                        <Typography> {c.name}</Typography>
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            )}
          />
          {errors["communeId"] && (
            <Typography variant="caption" color="error" m="3px 14px">
              {errors["communeId"]?.message}
            </Typography>
          )}
        </FormControl>
      </Stack>

      <Controller
        control={control}
        name="street"
        rules={{
          required: "This field is required",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            required
            label="Street"
            error={!!errors["street"]}
            helperText={errors["street"]?.message}
          />
        )}
      />
    </Stack>
  );
};

export default UserAddressFormSection;
