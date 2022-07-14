import { Stack, Typography } from "@mui/material";
import VoucherCarousel from "features/cart/components/VoucherItem/VoucherCarousel";
import VoucherInput from "features/cart/components/VoucherItem/VoucherInput";

const VOUCHERS = [
  {
    name: "save 5%",
    description: "Save 5% when you buy Sony Xperia and Samsung products",
    autoApply: true,
  },
  {
    name: "save 4%",
    description: "Lorem ipsum sit amet",
  },
  {
    name: "save 10%",
    description: "Lorem ipsum sit amet",
  },
  {
    name: "save 12%",
    description: "Lorem ipsum sit amet",
  },
];

const VoucherSection = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      px={1}
      py={2}
      spacing={1}
      maxWidth={{ sm: "auto", md: 740 }}
      width={1}
    >
      <Typography variant="h4">Voucher</Typography>

      <VoucherCarousel vouchers={VOUCHERS} />

      <Typography>
        <b>Auto apply: </b>
        {VOUCHERS[0].description}
      </Typography>
      <VoucherInput />
    </Stack>
  );
};

export default VoucherSection;
