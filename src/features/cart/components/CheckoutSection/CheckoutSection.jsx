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

const CheckoutSection = ({ cardSx }) => {
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
              6.900.000₫
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
            <Typography>7.000.000₫</Typography>
          </Stack>

          <Stack
            pt={0.5}
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography variant="subtitle1">Saving</Typography>
            <Typography>-100.000₫</Typography>
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
