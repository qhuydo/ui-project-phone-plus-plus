import {
  Stack,
  Card,
  CardContent,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import { cartItemType, pushSaleType } from "features/cart/types";
import { useCheckoutPrices } from "hooks";
import PropTypes from "prop-types";

const PaymentCheckoutSection = ({
  cardSx,
  cartItems,
  buttonGroup,
  deliveryMethod,
  showDeliveryFee,
  pushSaleMap,
}) => {
  const { estimatePrice, subTotalPrice, savingPrice, deliveryFee } =
    useCheckoutPrices(cartItems, deliveryMethod, pushSaleMap);

  return (
    <Stack direction="column" spacing={1}>
      <Card variant="outlined" sx={{ ...cardSx }}>
        <CardContent component={Stack} direction="column">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography variant="h6" fontWeight="bold">
              Total (estimate)
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {estimatePrice}
            </Typography>
          </Stack>
          <Typography variant="subtitle2">VAT inclusive</Typography>

          <Divider />

          <Stack
            pt={1}
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography variant="subtitle1">Subtotal</Typography>
            <Typography>{subTotalPrice}</Typography>
          </Stack>

          {showDeliveryFee && (
            <Stack
              pt={1}
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography variant="subtitle1">Delivery fee</Typography>
              <Typography>{deliveryFee}</Typography>
            </Stack>
          )}

          <Stack
            pt={0.5}
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography variant="subtitle1">Saving</Typography>
            <Typography>{`-${savingPrice}`}</Typography>
          </Stack>

          <Stack
            pt={0.5}
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography variant="subtitle1">Discount</Typography>
            <Typography>-0₫</Typography>
          </Stack>

          {buttonGroup}
        </CardContent>
      </Card>

      <Typography variant="caption" px={0.5}>
        By submitting your order, you agree to the{" "}
        <Link>Terms & Conditions</Link> an we will use your personal data in
        accordance with our <Link>Privacy Policy</Link>
      </Typography>
    </Stack>
  );
};

PaymentCheckoutSection.defaultValues = {
  showDeliveryFee: false,
};

PaymentCheckoutSection.propTypes = {
  cardSx: PropTypes.any,
  cartItems: PropTypes.arrayOf(cartItemType),
  buttonGroup: PropTypes.element,
  deliveryMethod: PropTypes.string,
  showDeliveryFee: PropTypes.bool,
  pushSaleMap: PropTypes.objectOf(pushSaleType),
};

export default PaymentCheckoutSection;
