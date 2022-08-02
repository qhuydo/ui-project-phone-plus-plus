import {
  Stack,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { countries } from "features/payment/assets";
import { useState, useCallback } from "react";

const CustomerDetailsFormSection = () => {
  const [countryCode, setCountryCode] = useState("VN");

  const handleChange = useCallback((event) => {
    setCountryCode(event.target.value);
  }, []);

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="column" spacing={0.5} pb={1}>
        <Typography variant="h6">Customer details</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Used only for sending notifications
        </Typography>
      </Stack>

      <Stack direction="column" spacing={2}>
        <TextField
          variant="outlined"
          required
          label="Full name"
          placeholder="John Doe"
          helperText="Your full name, including any middle name"
        />

        <Stack direction="row" spacing={2}>
          <FormControl>
            <InputLabel id="phone-country-code-label">Country code</InputLabel>
            <Select
              labelId="phone-country-code-label"
              id="phone-country-code-select"
              value={countryCode}
              label="Country code"
              onChange={handleChange}
            >
              {countries.map((c) => (
                <MenuItem value={c.isoCode} key={c.isoCode}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box component="img" maxHeight={20} src={c.thumbnail} />
                    <Typography> {c.dialCode}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            required
            label="Phone number"
            placeholder="000-000-000"
          />

          <TextField
            sx={{ flexGrow: 1 }}
            variant="outlined"
            required
            label="Email address"
            placeholder="email@example.com"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CustomerDetailsFormSection;
