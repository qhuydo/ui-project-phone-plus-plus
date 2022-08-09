import {
  getCurrentStatus,
  isOrderCancellable,
  isOrderRefundable,
  getEstimatedDeliveryDate,
  shouldDisplayDeliveryTime as shouldDisplayDeliveryTimeFn,
  getCurrentStep,
} from "features/order/utils";
import { useMemo } from "react";

export function useOrderStatus(order) {
  const currentStatus = useMemo(() => getCurrentStatus(order), [order]);

  const isCancellable = useMemo(
    () => isOrderCancellable(currentStatus),
    [currentStatus]
  );

  const isRefundable = useMemo(
    () => isOrderRefundable(currentStatus),
    [currentStatus]
  );

  const shouldDisplayDeliveryTime = useMemo(
    () => shouldDisplayDeliveryTimeFn(currentStatus),
    [currentStatus]
  );

  const estimatedDeliveryDate = useMemo(
    () =>
      getEstimatedDeliveryDate(
        order?.contactDetails?.deliveryMethod,
        order?.timeStamp
      ),
    [order]
  );

  const activeStep = useMemo(() => getCurrentStep(order), [order]);

  return {
    currentStatus,
    isRefundable,
    isCancellable,
    estimatedDeliveryDate,
    shouldDisplayDeliveryTime,
    activeStep,
  };
}
