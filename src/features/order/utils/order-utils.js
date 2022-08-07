import * as dayjs from "dayjs";
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
      statusLabel: "In transit",
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
      statusLabel: "Order packed",
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: "done",
      statusLabel: "Order created",
      date: dayjs(dateCreated).format("LLLL"),
      fromStore: null,
      location: "",
      activity: "",
    },
  ];
}
