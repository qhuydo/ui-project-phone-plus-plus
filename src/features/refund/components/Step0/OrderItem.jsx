import { Stack, Typography, FormControlLabel, Radio } from "@mui/material";
import { cartItemType } from "features/cart/types";
import { orderType } from "features/order/types";
import CartItem from "features/payment/components/Info/CartItem";
import PropTypes from "prop-types";
import { useMemo } from "react";
import QRCode from "react-qr-code";
import { Router } from "routes";

const OrderItem = ({ order, cartItem, value }) => {
  const pushSale = useMemo(() => {
    return order?.pushSaleMap
      ? order?.pushSaleMap[cartItem?.phone?.id ?? "-1"]
      : undefined;
  }, [cartItem?.phone?.id, order?.pushSaleMap]);

  const qrValue = useMemo(
    () => Router.getOrderTrackingPageWithDomain(order?.id ?? ""),
    [order?.id]
  );

  return (
    <Stack
      direction="column"
      spacing={1}
      width={1}
      bgcolor="primary.50"
      p={2}
      sx={{ borderRadius: "8px" }}
    >
      <Typography variant="h6" color="secondary.dark">
        Order No. <b>#{order.id}</b>
      </Typography>

      <Stack direction="row" spacing={1} width={1}>
        <CartItem
          item={cartItem}
          showQuantity
          showPrice
          pushSale={pushSale}
          sx={{ flexGrow: 1 }}
        />
        <QRCode value={qrValue} size={100} />
      </Stack>

      <FormControlLabel
        control={
          <Radio
            // value={`${order.id}__${cartItem.phone.id}__${cartItem.version.id}`}
            value={value}
          />
        }
        label="Select this order"
      />
    </Stack>
  );
};

OrderItem.propTypes = {
  order: orderType,
  cartItem: cartItemType,
  value: PropTypes.number,
  // isSelected: PropTypes.bool,
  // onChange: PropTypes.func,
};

export default OrderItem;
