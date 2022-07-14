import {
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useCartContext } from "features/cart/context/CartContext";
import { useMemo } from "react";
import formatNumberToVND from "utils/currency-formatter";
import {
  calculateEstimatePrice,
  calculateSavingPrice,
  calculateSubtotalPrice,
} from "features/cart/utils";

const CheckoutSection = ({ cardSx }) => {
  const {
    state: { cartItems },
  } = useCartContext();

  const estimatePrice = useMemo(() => {
    return formatNumberToVND(calculateEstimatePrice(cartItems));
  }, [cartItems]);

  const subTotalPrice = useMemo(() => {
    return formatNumberToVND(calculateSubtotalPrice(cartItems));
  }, [cartItems]);

  const savingPrice = useMemo(() => {
    return formatNumberToVND(calculateSavingPrice(cartItems));
  }, [cartItems]);

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

          <Button
            sx={{ mt: 2, width: 0.9, alignSelf: "center" }}
            variant="contained"
          >
            Checkout
          </Button>
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

CheckoutSection.propTypes = {
  cardSx: PropTypes.any,
};

export default CheckoutSection;
