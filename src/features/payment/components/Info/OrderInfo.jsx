import { Stack, Typography, Divider, Box, LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import { TextRow } from "features/payment/components/Info/DeliveryInfo";
import { DeliveryInfo } from "features/payment/components/Info/index";
import ProductBill from "features/payment/components/Info/ProductBill";
import { orderType } from "features/payment/types";
import { PAYMENT_METHODS, PAYMENT_METHOD_TEXTS } from "features/payment/utils";
import { useMemo } from "react";
import QRCode from "react-qr-code";

const OrderInfo = ({ order, ...others }) => {
  const date = useMemo(
    () => dayjs(order?.timeStamp ?? undefined).format("LLLL"),
    [order?.timeStamp]
  );

  const paymentMethod = useMemo(
    () =>
      order
        ? `${PAYMENT_METHOD_TEXTS[order.paymentMethod.method]}
              ${
                order.paymentMethod.method === PAYMENT_METHODS.creditOrDebitCard
                  ? ` (*******${order.paymentMethod.creditOrDebitCard.cardNumber.slice(
                      -4
                    )})`
                  : ""
              }`
        : "",
    [order]
  );

  return order ? (
    <Stack direction="column" spacing={1} p={1} {...others}>
      <Stack direction="row" spacing={1} alignItems="baseline">
        <Typography variant="h5" flexWrap="wrap">
          Order No. <b>#{order.id}</b>
        </Typography>
        <Typography color="text.secondary">({date})</Typography>
      </Stack>

      <Divider flexItem />

      <Stack direction="row">
        <Stack direction="column" spacing={1} flexGrow={1}>
          <DeliveryInfo
            contactDetails={order.contactDetails}
            timestamp={order.timestamp}
          />
          <Stack direction="row" alignItems="baseline" px={1}>
            <TextRow title={"Payment method"} content={paymentMethod} />
          </Stack>
        </Stack>
        <QRCode value="https://youtu.be/dQw4w9WgXcQ" size={200} />
      </Stack>

      <ProductBill order={order} />
    </Stack>
  ) : (
    <Box width={1}>
      <LinearProgress />
    </Box>
  );
};

OrderInfo.propTypes = {
  order: orderType,
};

export default OrderInfo;
