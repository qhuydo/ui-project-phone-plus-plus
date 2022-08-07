import * as dayjs from "dayjs";
import {
  ORDER_TRACKING_STEPS,
  ORDER_TRACKING_DATE_FORMAT,
} from "features/order/utils/constants";
import { provinces } from "features/payment/assets";
import {
  getAddress,
  getAddressFromDeliveryDetails,
} from "features/payment/utils";
import { DELIVERY_DATE_FORMAT } from "features/payment/utils/constants";

export function getEstimatedDeliveryDate(type, date) {
  if (type === "standard") {
    return dayjs(date ?? new Date())
      .add(4, "day")
      .format(DELIVERY_DATE_FORMAT);
  }
  return dayjs(date ?? new Date())
    .add(2, "day")
    .format(DELIVERY_DATE_FORMAT);
}

export function getInitialOrderStatus(dateCreated) {
  return [
    {
      status: "pending",
      statusLabel: "Delivery",
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: "pending",
      statusLabel: "Out for delivery",
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: "pending",
      statusLabel: "In transit",
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: "pending",
      statusLabel: "Order packed",
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: "done",
      statusLabel: "Order created",
      date: [dayjs(dateCreated).format(ORDER_TRACKING_DATE_FORMAT)],
      fromStore: null,
      location: null,
      activity: null,
    },
  ];
}

export function getCurrentStatus(order) {
  if (order && order.status) {
    for (const status of order.status) {
      if (status.status === "loading" || status.status === "done") {
        return status;
      }
    }
  }
  return null;
}

export function isOrderCancellable(orderStatus) {
  return (
    orderStatus &&
    orderStatus.status === "done" &&
    orderStatus.statusLabel === ORDER_TRACKING_STEPS.created
  );
}

export function isOrderRefundable(orderStatus) {
  return (
    orderStatus &&
    orderStatus.status === "done" &&
    orderStatus.statusLabel === ORDER_TRACKING_STEPS.delivery
  );
}

export function shouldDisplayDeliveryTime(orderStatus) {
  return (
    orderStatus && orderStatus.statusLabel === ORDER_TRACKING_STEPS.delivery
  );
}

export function getLastDoneStep(order) {
  if (order && order.status) {
    for (const status of order.status) {
      if (status.status === "done") {
        const idx = Object.values(ORDER_TRACKING_STEPS).findIndex(
          (s) => s === status.statusLabel
        );
        return idx !== -1 ? idx : 0;
      }
    }
  }
  return 0;
}
