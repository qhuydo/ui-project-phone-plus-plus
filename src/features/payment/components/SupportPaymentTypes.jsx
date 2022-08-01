import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  DollarBanknote,
  MastercardLogo,
  PaypalLogo,
  VisaLogo,
} from "features/cart/assets/logo";
import PropTypes from "prop-types";

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

const SupportPaymentTypes = ({ showDivider }) => {
  return (
    <Stack direction="column" spacing={1} px={2} width={1}>
      <Typography variant="h6">Support payment methods</Typography>
      <Stack direction="row" spacing={1} overflow="auto">
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
            <Typography variant="button" noWrap>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
      {showDivider && <Divider sx={{ pt: 1 }} />}
    </Stack>
  );
};

SupportPaymentTypes.propTypes = {
  showDivider: PropTypes.bool,
};

export default SupportPaymentTypes;
