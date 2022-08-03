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
import { useFormContext, Controller } from "react-hook-form";
import { EMAIL_REGEX, NUMBER_REGEX } from "utils/regex";

const CustomerDetailsFormSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="column" spacing={0.5} pb={1}>
        <Typography variant="h6">Customer details</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Used only for sending notifications
        </Typography>
      </Stack>

      <Stack direction="column" spacing={2}>
        <Controller
          control={control}
          name="customerDetails.fullName"
          rules={{
            required: "Please enter your fullname",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors["customerDetails"]?.["fullName"]}
              required
              variant="outlined"
              label="Full name"
              placeholder="John Doe"
              helperText={
                errors["customerDetails"]?.["fullName"]?.message ||
                "Your full name, including any middle name"
              }
            />
          )}
        />

        <Stack direction="row" spacing={2}>
          <FormControl>
            <InputLabel id="phone-country-code-label">Country code</InputLabel>
            <Controller
              control={control}
              name="customerDetails.phoneIsoCode"
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="phone-country-code-label"
                  id="phone-country-code-select"
                  label="Country code"
                  renderValue={(value) => (
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Box
                        component="img"
                        maxHeight={20}
                        src={countries[value]?.thumbnail}
                      />
                      <Typography> {countries[value]?.dialCode}</Typography>
                    </Stack>
                  )}
                >
                  {Object.values(countries).map((c) => (
                    <MenuItem value={c.isoCode} key={c.isoCode}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Box
                          component="img"
                          loading="lazy"
                          maxHeight={20}
                          src={c.thumbnail}
                          alt={c.isoCode}
                        />
                        <Typography> {c.dialCode}</Typography>
                        <Typography> {c.name}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Controller
            control={control}
            name="customerDetails.phoneNumber"
            rules={{
              required: "Please enter your phone number",
              pattern: {
                value: NUMBER_REGEX,
                message: "Please enter a valid phone number",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                required
                label="Phone number"
                placeholder="000-000-000"
                error={!!errors["customerDetails"]?.["phoneNumber"]}
                helperText={
                  errors["customerDetails"]?.["phoneNumber"]?.message ||
                  "Your phone number, without country code"
                }
              />
            )}
          />

          <Controller
            control={control}
            name="customerDetails.email"
            rules={{
              required: "Please enter your email address",
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                sx={{ flexGrow: 1 }}
                variant="outlined"
                type="email"
                label="Email address"
                placeholder="email@example.com"
                error={!!errors["customerDetails"]?.["email"]}
                helperText={
                  errors["customerDetails"]?.["email"]?.message ||
                  "Your email address"
                }
              />
            )}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CustomerDetailsFormSection;
