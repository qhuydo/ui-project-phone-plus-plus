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

const ShipmentStatusOverview = () => {
  const {
    state: { order },
  } = useOrderTrackingContext();

  const {
    isRefundable,
    isCancellable,
    currentStatus,
    estimatedDeliveryDate,
    shouldDisplayDeliveryTime,
    activeStep,
  } = useOrderStatus(order);

  return order ? (
    <Stack direction="column" spacing={2} px={1}>
      <Typography variant="h5">
        Current status: <b>{currentStatus?.statusLabel}</b>
      </Typography>
      <Divider flexItem sx={{ pt: 1 }} />

      <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 3 }}>
        {Object.values(ORDER_TRACKING_STEPS).map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {currentStatus.activity && (
        <Typography sx={{ pt: 1 }}>{currentStatus.activity}</Typography>
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
        <Stack
          direction="row"
          width={1}
          pt={1}
          alignItems="center"
          display="none"
        >
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
