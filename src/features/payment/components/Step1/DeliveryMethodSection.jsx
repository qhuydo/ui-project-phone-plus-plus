import {
  Stack,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  DELIVERY_METHODS,
  DELIVERY_METHOD_TEXTS,
  DELIVERY_METHOD_HELPER_TEXTS1,
  DELIVERY_METHOD_HELPER_TEXTS2,
} from "features/payment/utils";
import { useFormContext, Controller } from "react-hook-form";

const DeliveryMethodSection = () => {
  const { control } = useFormContext();

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h6">Delivery method</Typography>

      <Controller
        control={control}
        name="deliveryMethod"
        render={({ field }) => (
          <RadioGroup {...field}>
            {DELIVERY_METHODS.map((item, idx) => {
              return (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={
                    <Stack direction="column" spacing={0.5} alignItems="start">
                      <Typography variant="body1" color="inherit">
                        {DELIVERY_METHOD_TEXTS[idx]}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        pt={0.5}
                      >
                        {DELIVERY_METHOD_HELPER_TEXTS1[idx]}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {DELIVERY_METHOD_HELPER_TEXTS2[idx]}
                      </Typography>
                    </Stack>
                  }
                  labelPlacement="end"
                  sx={{
                    alignItems: "start",
                    m: 0,
                    my: 1,
                    "&:hover": {
                      bgcolor: "primary.50",
                      color: "primary.main",
                    },
                    color: "text.primary",
                  }}
                />
              );
            })}
          </RadioGroup>
        )}
      />
    </Stack>
  );
};

export default DeliveryMethodSection;
