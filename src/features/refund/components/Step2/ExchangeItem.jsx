import {
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { cartItemType } from "features/cart/types";
import { orderType } from "features/order/types";
import CartItem from "features/payment/components/Info/CartItem";
import PropTypes from "prop-types";
import { useMemo } from "react";

const ExchangeItem = ({ cartItem, order, checked, onCheckChanged }) => {
  const pushSale = useMemo(() => {
    return order?.pushSaleMap
      ? order?.pushSaleMap[cartItem?.phone?.id ?? "-1"]
      : undefined;
  }, [cartItem?.phone?.id, order?.pushSaleMap]);

  return (
    <Stack
      direction="column"
      spacing={1}
      bgcolor="primary.50"
      width={1}
      p={2}
      borderRadius="8px"
    >
      <Stack direction="row">
        <Typography color="secondary.main" variant="h6">
          Order ID: #{order.id}
        </Typography>
      </Stack>

      <CartItem
        item={cartItem}
        showQuantity
        showPrice
        pushSale={pushSale}
        sx={{ flexGrow: 1 }}
      />

      <Divider flexItem />

      <FormControlLabel
        onChange={onCheckChanged}
        value={checked}
        control={<Checkbox />}
        label="I have received the exchanged product"
      />
    </Stack>
  );
};

ExchangeItem.propTypes = {
  cartItem: cartItemType,
  order: orderType,
  checked: PropTypes.bool,
  onCheckChanged: PropTypes.func,
};

export default ExchangeItem;
