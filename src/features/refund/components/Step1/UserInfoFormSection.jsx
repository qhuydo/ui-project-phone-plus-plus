import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import { countries } from "features/payment/assets";
import { useFormContext, Controller } from "react-hook-form";
import { NUMBER_REGEX, EMAIL_REGEX } from "utils/regex";

const UserInfoFormSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack direction="column" spacing={2}>
      <Controller
        control={control}
        name="fullName"
        rules={{
          required: "Please enter your fullname",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors["fullName"]}
            variant="outlined"
            required
            label="Full name"
            placeholder="Enter your full name here"
            helperText={
              errors["fullName"]?.message ||
              "Your full name, including any middle name"
            }
          />
        )}
      />

      <Controller
        control={control}
        name="email"
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
            error={!!errors["email"]}
            variant="outlined"
            required
            label="Email"
            placeholder="Enter your email here"
            helperText={errors["email"]?.message || ""}
          />
        )}
      />

      <Stack direction="row" spacing={2} width={1}>
        <FormControl>
          <InputLabel id="phone-country-code-label">Country code</InputLabel>
          <Controller
            control={control}
            name="phoneIsoCode"
            render={({ field }) => (
              <Select
                {...field}
                labelId="phone-country-code-label"
                id="phone-country-code-select"
                label="Country code"
                renderValue={(value) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    minWidth={80}
                  >
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
          name="phoneNumber"
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
              fullWidth
              label="Phone number"
              placeholder="000-000-000"
              error={!!errors["phoneNumber"]}
              helperText={
                errors["phoneNumber"]?.message ||
                "Your phone number, without country code"
              }
            />
          )}
        />
      </Stack>

      <Controller
        control={control}
        name="content"
        rules={{
          required: "Please enter your content",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors["content"]}
            required
            label="Content"
            placeholder="Enter your content here"
            helperText={errors["content"]?.message || ""}
          />
        )}
      />
    </Stack>
  );
};

export default UserInfoFormSection;
