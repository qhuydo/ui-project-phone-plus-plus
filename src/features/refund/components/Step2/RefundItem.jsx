import { Stack, Typography, Divider, Box } from "@mui/material";
import CartItem from "features/payment/components/Info/CartItem";
import RefundCreditCardAccordion from "features/refund/components/Step2/RefundCreditCartAccordion";
import RefundPaypalFormAccordion from "features/refund/components/Step2/RefundPaypalAccordion";
import { useRefundContext } from "features/refund/context";
import { useEffect, useMemo, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";

const RefundItem = () => {
  const {
    state: { selectedCartItem: cartItem, selectedOrder: order, refundMethod },
    dispatch,
  } = useRefundContext();
  const pushSale = useMemo(() => {
    return order?.pushSaleMap
      ? order?.pushSaleMap[cartItem?.phone?.id ?? "-1"]
      : undefined;
  }, [cartItem?.phone?.id, order?.pushSaleMap]);

  const form = useForm({
    defaultValues: useMemo(() => refundMethod, [refundMethod]),
    mode: "onTouched",
  });

  const onSubmitted = useCallback(() => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 3 });
  }, [dispatch]);

  useEffect(() => {
    const subscription = form.watch((value) =>
      dispatch({ type: "SET_REFUND_METHOD", payload: value })
    );
    return () => subscription.unsubscribe();
  }, [dispatch, form]);

  return (
    <FormProvider {...form}>
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

        <Box maxWidth={800}>
          <RefundCreditCardAccordion onSubmitted={onSubmitted} />
        </Box>

        <Box maxWidth={800}>
          <RefundPaypalFormAccordion onSubmitted={onSubmitted} />
        </Box>
      </Stack>
    </FormProvider>
  );
};

RefundItem.propTypes = {};

export default RefundItem;
