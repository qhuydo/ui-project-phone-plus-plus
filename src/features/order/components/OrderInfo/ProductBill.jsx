import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { SpecsTableRow, SpecsTableCell } from "components/Table";
import { orderType } from "features/order/types";
import CartItem from "features/payment/components/Info/CartItem";
import { useCheckoutPrices } from "hooks";
import formatNumberToVND from "utils/currency-formatter";

const ProductBill = ({ order }) => {
  const { estimatePrice, subTotalPrice, savingPrice, deliveryFee } =
    useCheckoutPrices(order.cartItems, order.contactDetails.deliveryMethod);

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <SpecsTableRow>
            <SpecsTableCell sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Product</Typography>
            </SpecsTableCell>

            <SpecsTableCell
              sx={{
                width: 160,
                maxWidth: 160,
                verticalAlign: "top",
              }}
            >
              <Typography variant="h6" textAlign="end">
                Unit price
              </Typography>
            </SpecsTableCell>

            <SpecsTableCell
              sx={{
                width: 160,
                maxWidth: 160,
                verticalAlign: "top",
              }}
            >
              <Typography variant="h6" textAlign="end">
                Quantity
              </Typography>
            </SpecsTableCell>

            <SpecsTableCell
              sx={{
                width: 220,
                maxWidth: 220,
                verticalAlign: "top",
              }}
            >
              <Typography variant="h6" textAlign="end">
                Amount
              </Typography>
            </SpecsTableCell>
          </SpecsTableRow>
        </TableHead>
        <TableBody>
          {order.cartItems.map((item, idx) => {
            return (
              <SpecsTableRow key={idx}>
                <SpecsTableCell sx={{ verticalAlign: "top" }}>
                  <CartItem
                    item={item}
                    showPrice={false}
                    showQuantity={false}
                  />
                </SpecsTableCell>

                <SpecsTableCell sx={{ verticalAlign: "top" }}>
                  <Typography textAlign="end">
                    {item.version.displaySalePrice}
                  </Typography>
                </SpecsTableCell>

                <SpecsTableCell sx={{ verticalAlign: "top" }}>
                  <Typography textAlign="end">{item.quantity}</Typography>
                </SpecsTableCell>

                <SpecsTableCell sx={{ verticalAlign: "top" }}>
                  <Typography textAlign="end">
                    {formatNumberToVND(item.version.salePrice * item.quantity)}
                  </Typography>
                </SpecsTableCell>
              </SpecsTableRow>
            );
          })}
          <SpecsTableRow>
            <SpecsTableCell sx={{ borderColor: "transparent" }} colSpan={4}>
              <Box width={1} justifyContent="end" display="flex">
                <Stack
                  direction="column"
                  width={650}
                  alignSelf="end"
                  spacing={0.5}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="baseline"
                  >
                    <Typography variant="subtitle1">Subtotal</Typography>
                    <Typography>{subTotalPrice}</Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="baseline"
                  >
                    <Typography variant="subtitle1">Delivery fee</Typography>
                    <Typography>{deliveryFee}</Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="baseline"
                  >
                    <Typography variant="subtitle1">Saving</Typography>
                    <Typography>{`-${savingPrice}`}</Typography>
                  </Stack>

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
                </Stack>
              </Box>
            </SpecsTableCell>
          </SpecsTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ProductBill.propTypes = {
  order: orderType,
};

export default ProductBill;
