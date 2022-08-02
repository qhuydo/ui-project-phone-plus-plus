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
import { useState, useCallback } from "react";

// TODO: refactor this file
const DeliveryDetailsFormSection = () => {
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
      <Stack direction="column" spacing={0.5} pb={1}>
        <Typography variant="h6">Delivery details</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Delivery is available within Vietnam
        </Typography>
      </Stack>

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
    </Stack>
  );
};

export default DeliveryDetailsFormSection;
