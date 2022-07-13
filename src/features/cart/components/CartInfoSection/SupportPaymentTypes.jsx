import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  DollarBanknote,
  MastercardLogo,
  PaypalLogo,
  VisaLogo,
} from "features/cart/assets/logo";

const PAYMENT_TYPES = [
  {
    name: "Visa",
    src: VisaLogo,
  },
  {
    name: "Mastercard",
    src: MastercardLogo,
  },
  {
    name: "Paypal",
    src: PaypalLogo,
  },
  {
    name: "Cash on delivery",
    src: DollarBanknote,
  },
];

const SupportPaymentTypes = () => {
  return (
    <Stack direction="column" spacing={1} px={2}>
      <Typography variant="h6">Support payment methods</Typography>
      <Stack direction="row" spacing={1}>
        {PAYMENT_TYPES.map((item, index) => (
          <Stack
            direction="row"
            key={index}
            spacing={1}
            p={0.5}
            alignItems="center"
            sx={(theme) => ({
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: `${theme.shape.borderRadius}px`,
            })}
          >
            <Box component="img" height={40} width="auto" src={item.src} />
            <Typography variant="button">{item.name}</Typography>
          </Stack>
        ))}
      </Stack>
      <Divider sx={{ pt: 1 }} />
    </Stack>
  );
};

export default SupportPaymentTypes;
