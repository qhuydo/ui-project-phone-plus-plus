import {
  Stack,
  Typography,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Link,
} from "@mui/material";
import { useOrderTrackingContext } from "features/order/context";
import { useOrderStatus } from "features/order/hooks";
import { ORDER_TRACKING_STEPS } from "features/order/utils";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ShipmentStatusOverview = () => {
  const {
    state: { order },
    refreshOrder,
  } = useOrderTrackingContext();

  const {
    currentStatus,
    isRefundable,
    isCancellable,
    estimatedDeliveryDate,
    shouldDisplayDeliveryTime,
    activeStep,
  } = useOrderStatus(order);

  return order ? (
    <Stack direction="column" spacing={2} px={1}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" width={1} justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h5">
              Current status:{" "}
              <b>
                {order.finishDelivery
                  ? "Delivered"
                  : currentStatus?.statusLabel}
              </b>
            </Typography>
            {order.finishDelivery && <CheckCircleIcon color="success" />}
          </Stack>

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={refreshOrder}
          >
            Refresh
          </Button>
        </Stack>

        <Divider flexItem sx={{ pt: 1 }} />
      </Stack>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 3 }}>
        {Object.values(ORDER_TRACKING_STEPS).map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {currentStatus.activity && (
        <Typography sx={{ pt: 1 }}>{currentStatus.activity[0]}</Typography>
      )}

      {isCancellable && (
        <Stack direction="row" width={1} alignItems="center">
          <Stack direction="column" flexGrow={1}>
            <Typography variant="h6">Cancel the order</Typography>
            <Typography>
              You can cancel your order with 30 minutes by pressing CANCEL ORDER
              after your order has been placed
            </Typography>
          </Stack>
          <Box>
            <Button variant="outlined" fullWidth={false}>
              Cancel
            </Button>
          </Box>
        </Stack>
      )}

      {isRefundable && (
        <Stack direction="row" width={1} pt={1} alignItems="center">
          <Stack direction="column" flexGrow={1}>
            <Typography variant="h6">Refund</Typography>
            <Typography>
              You can make a refund request by pressing REFUND after your order
              has been deliver. <Link>Terms and conditions apply.</Link>
            </Typography>
          </Stack>
          <Box>
            <Button variant="outlined" fullWidth={false}>
              Refund
            </Button>
          </Box>
        </Stack>
      )}

      <Stack
        direction="row"
        width={1}
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Stack direction="row" spacing={1}>
          <Typography variant="h6">Scheduled delivery</Typography>
          <Typography variant="h5">{estimatedDeliveryDate}</Typography>
        </Stack>

        {shouldDisplayDeliveryTime && (
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">Estimated time</Typography>
            <Typography variant="h5">11:00</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  ) : null;
};

export default ShipmentStatusOverview;
