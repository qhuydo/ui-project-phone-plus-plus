import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Stack, Button, IconButton } from "@mui/material";
import ExchangeItem from "features/refund/components/Step2/ExchangeItem";
import RefundItem from "features/refund/components/Step2/RefundItem";
import { useRefundContext } from "features/refund/context";
import { POLICY_REFUND } from "features/refund/utils";
import { TOTAL_REFUND_EXCHANGE_STEPS } from "features/refund/utils/small-step-exchange";
import { useCallback, useMemo, useState } from "react";
import { RefundProcess } from "../Step2/index";

const RefundExchangeStep2 = () => {
  const {
    state: {
      refundCurrentStep,
      selectedCartItem,
      selectedOrder,
      refundInfo: { policy },
    },
    dispatch,
  } = useRefundContext();

  const changeToNextRefundStep = useCallback(() => {
    if (refundCurrentStep < TOTAL_REFUND_EXCHANGE_STEPS - 1) {
      dispatch({
        type: "SET_REFUND_CURRENT_STEP",
        payload: refundCurrentStep + 1,
      });
    }
  }, [dispatch, refundCurrentStep]);

  const changeToNextStep = useCallback(() => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 3 });
  }, [dispatch]);

  const [isChecked, setIsChecked] = useState(false);

  const canNavigateToNext = useMemo(() => {
    return refundCurrentStep === TOTAL_REFUND_EXCHANGE_STEPS;
  }, [refundCurrentStep]);

  const onCheckedChanged = useCallback(
    (event, isChecked) => {
      setIsChecked(isChecked);
      if (isChecked) {
        dispatch({
          type: "SET_REFUND_CURRENT_STEP",
          payload: TOTAL_REFUND_EXCHANGE_STEPS,
        });
      } else {
        dispatch({
          type: "SET_REFUND_CURRENT_STEP",
          payload: TOTAL_REFUND_EXCHANGE_STEPS - 1,
        });
      }
    },
    [dispatch]
  );

  const isRefundPolicy = useMemo(() => policy === POLICY_REFUND, [policy]);

  return (
    <Box position="relative">
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Box
          p={2}
          py={4}
          sx={{
            display: "flex",
            width: 832,
            border: 1,
            borderColor: "primary.main",
            borderRadius: "8px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RefundProcess />
        </Box>

        {refundCurrentStep >= TOTAL_REFUND_EXCHANGE_STEPS - 1 &&
          !isRefundPolicy && (
            <ExchangeItem
              cartItem={selectedCartItem}
              order={selectedOrder}
              checked={isChecked}
              onCheckChanged={onCheckedChanged}
            />
          )}

        {refundCurrentStep >= TOTAL_REFUND_EXCHANGE_STEPS - 1 &&
          isRefundPolicy && <RefundItem />}

        <Box>
          <Button
            startIcon={<NavigateNextIcon />}
            variant="contained"
            disabled={!canNavigateToNext}
            onClick={changeToNextStep}
          >
            Next step
          </Button>
        </Box>
      </Stack>

      <IconButton
        sx={{
          bottom: 0,
          right: 0,
          position: "absolute",
          display:
            refundCurrentStep >= TOTAL_REFUND_EXCHANGE_STEPS - 1
              ? "none"
              : null,
        }}
        onClick={changeToNextRefundStep}
      >
        <AccessTimeOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default RefundExchangeStep2;
