import { Button, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { submitOrder } from "features/payment/api";
import { DeliveryInfo, CartItemList } from "features/payment/components/Info";
import { usePaymentContext } from "features/payment/context";
import { useCheckoutPrices } from "hooks";
import PropTypes from "prop-types";
import { useCallback } from "react";

const OrderConfirmationDialog = () => {
  const { state, dispatch } = usePaymentContext();

  const { showConfirmationDialog, cartItems } = state;

  const onClosed = useCallback(() => {
    dispatch({ type: "CHANGE_CONFIRMATION_DIALOG_VISIBILITY", payload: false });
  }, [dispatch]);

  const handleOk = useCallback(async () => {
    onClosed();
    dispatch({ type: "SET_CURRENT_STEP", payload: 2 });
    // TODO handle error state
    const order = await submitOrder(state);
    dispatch({ type: "ADD_SUBMITTED_ORDER", payload: order });
  }, [dispatch, onClosed, state]);

  const [estimatePrice, subTotalPrice, savingPrice, deliveryFee] =
    useCheckoutPrices(cartItems, true);

  return (
    <Dialog
      maxWidth="md"
      open={showConfirmationDialog}
      sx={{ width: "100%" }}
      fullWidth
    >
      <DialogTitle>Order confirmation</DialogTitle>
      <DialogContent dividers>
        <Stack direction="column" spacing={1}>
          <Typography>Please confirm your information below</Typography>
          <DeliveryInfo showEditButton={false} p={0} />
          <CartItemList cartItems={cartItems} />
          <Stack direction="column">
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
              pt={1}
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography variant="subtitle1">Delivery fee</Typography>
              <Typography>{deliveryFee}</Typography>
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
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={onClosed}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleOk}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OrderConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  onClosed: PropTypes.func,
};

export default OrderConfirmationDialog;
