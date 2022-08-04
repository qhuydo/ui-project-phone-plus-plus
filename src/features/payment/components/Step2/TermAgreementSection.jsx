import {
  Stack,
  Typography,
  Link,
  ListItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";

const TermAgreementSection = () => {
  const { control, setValue } = useFormContext();

  const onTermsAndConditionsChecked = useCallback(
    async (e) => {
      setValue("termsAndConditionsChecked", e.target.checked, {
        shouldValidate: true,
      });
    },
    [setValue]
  );

  return (
    <Stack width={1} direction="column">
      <Typography>
        Tap the links below and read them carefully. By checking the boxes, you
        acknowledge that you have read and agree to the following terms: Your
        data will be used in accordance with our <Link>Privacy policy.</Link>
      </Typography>
      <ListItem
        dense
        sx={{
          "&:hover": {
            bgcolor: "primary.50",
          },
          p: 0,
        }}
      >
        <FormControlLabel
          label={
            "I would like to receive notifications about discounts and promotions."
          }
          color="inherit"
          sx={{ px: 0, width: 1 }}
          control={
            <Controller
              name="discountPromoSubscriptionChecked"
              defaultValue={false}
              control={control}
              render={({ field: props }) => (
                <Checkbox
                  {...props}
                  // eslint-disable-next-line react/prop-types
                  value={props.value}
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

      <ListItem
        dense
        sx={{
          "&:hover": {
            bgcolor: "primary.50",
          },
          p: 0,
        }}
      >
        <FormControlLabel
          label={
            <Typography>
              I understand and agree to the Phone++{" "}
              <Link>Terms and Conditions</Link>.
            </Typography>
          }
          color="inherit"
          sx={{ px: 0, width: 1 }}
          control={
            <Controller
              name="termsAndConditionsChecked"
              defaultValue={false}
              control={control}
              rules={{
                required:
                  "You need to read the terms and conditions before processing the payment",
              }}
              render={({ field: props }) => (
                <Checkbox
                  {...props}
                  // eslint-disable-next-line react/prop-types
                  value={props.value}
                  //eslint-disable-next-line react/prop-types
                  checked={props.value}
                  onChange={onTermsAndConditionsChecked}
                />
              )}
            />
          }
        />
      </ListItem>
    </Stack>
  );
};

export default TermAgreementSection;
