import * as dayjs from "dayjs";
import {
  ORDER_TRACKING_STEPS,
  ORDER_TRACKING_DATE_FORMAT,
  ORDER_STEP_STATUS,
} from "features/order/utils/constants";
import { provinces } from "features/payment/assets";
import {
  getAddress,
  getAddressFromDeliveryDetails,
} from "features/payment/utils";
import { DELIVERY_DATE_FORMAT } from "features/payment/utils/constants";
import { STORES } from "features/stores/assets";
import { random, shuffle } from "lodash-es";

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
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.delivery,
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.outForDelivery,
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.inTransit,
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.packed,
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.created,
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
      if (
        status.status === ORDER_STEP_STATUS.loading ||
        status.status === ORDER_STEP_STATUS.done
      ) {
        return status;
      }
    }
  }
  return null;
}

export function isOrderCancellable(orderStatus) {
  return (
    orderStatus &&
    orderStatus.status === ORDER_STEP_STATUS.done &&
    orderStatus.statusLabel === ORDER_TRACKING_STEPS.created
  );
}

export function isOrderRefundable(orderStatus) {
  return (
    orderStatus &&
    orderStatus.status === ORDER_STEP_STATUS.done &&
    orderStatus.statusLabel === ORDER_TRACKING_STEPS.delivery
  );
}

export function shouldDisplayDeliveryTime(orderStatus) {
  return (
    orderStatus && orderStatus.statusLabel === ORDER_TRACKING_STEPS.delivery
  );
}

export function getCurrentStep(order) {
  if (order.finishDelivery) {
    return Object.values(ORDER_TRACKING_STEPS).length;
  }

  if (order && order.status) {
    for (const status of order.status) {
      if (
        status.status === ORDER_STEP_STATUS.done ||
        status.status === ORDER_STEP_STATUS.loading
      ) {
        const idx = Object.values(ORDER_TRACKING_STEPS).findIndex(
          (s) => s === status.statusLabel
        );
        return idx !== -1 ? idx : 0;
      }
    }
  }
  return 0;
}

export async function getOrderStatusAfter2Days(order) {
  if (!order) return null;

  const dateCreated = dayjs(order.timestamp);
  const fromStore = STORES[random(Object.keys(STORES))].id;
  const facility1 = getAddress(fromStore.idProvince, fromStore.idDistrict);

  const provinceId2 = order.contactDetails?.deliveryDetails.provinceId;
  const districtId2 = shuffle(
    Object.values(provinces[provinceId2].districts).filter(
      (d) => d.idDistrict !== order.contactDetails?.deliveryDetails.districtId
    )
  )[0].idDistrict;

  const facility2 = getAddress(provinceId2, districtId2);

  return [
    {
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.delivery,
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.outForDelivery,
      date: null,
      fromStore: null,
      location: null,
      activity: null,
    },
    {
      status: ORDER_STEP_STATUS.loading,
      statusLabel: ORDER_TRACKING_STEPS.inTransit,
      date: [
        dateCreated.add(1.4, "d").format(ORDER_TRACKING_DATE_FORMAT),
        dateCreated.add(1.25, "d").format(ORDER_TRACKING_DATE_FORMAT),
        dateCreated.add(3.5, "h").format(ORDER_TRACKING_DATE_FORMAT),
        dateCreated.add(2, "h").format(ORDER_TRACKING_DATE_FORMAT),
      ],
      fromStore: [null, null, null, null],
      location: [facility2, facility2, facility1, facility1],
      activity: [
        "Departed from Facility",
        "Arrived at Facility",
        "Departed from Facility",
        "Arrived at Facility",
      ],
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.packed,
      date: [dateCreated.add(1, "h").format(ORDER_TRACKING_DATE_FORMAT)],
      fromStore: [fromStore],
      location: [null],
      activity: ["Order packed, ready to be sent to our delivery partner"],
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.created,
      date: [dateCreated.format(ORDER_TRACKING_DATE_FORMAT)],
      fromStore: null,
      location: null,
      activity: null,
    },
  ];
}

export async function getOrderStatusAfter4Days(order) {
  if (!order) return null;

  const currentStep = getCurrentStatus(order);
  let statusAfter2Days;

  if (currentStep.statusLabel === ORDER_TRACKING_STEPS.inTransit) {
    statusAfter2Days = order.status;
  } else {
    statusAfter2Days = await getOrderStatusAfter2Days(order);
  }
  const dateCreated = dayjs(order.timestamp);

  const facility3 = getAddress(
    order.contactDetails?.deliveryDetails?.provinceId,
    order.contactDetails?.deliveryDetails?.districtId
  );

  return [
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.delivery,
      date: [dateCreated.add(3.85, "d").format(ORDER_TRACKING_DATE_FORMAT)],
      fromStore: [null],
      location: [
        getAddressFromDeliveryDetails(order.contactDetails?.deliveryDetails),
      ],
      activity: ["Delivered by Duy Van (tel: 0912233125)"],
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.outForDelivery,
      date: [dateCreated.add(3.25, "d").format(ORDER_TRACKING_DATE_FORMAT)],
      fromStore: [null],
      location: [facility3],
      activity: [
        "Out for delivery today. Delivered by Duy Van (tel: 0912233125)",
      ],
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.inTransit,
      date: [
        dateCreated.add(3.25, "d").format(ORDER_TRACKING_DATE_FORMAT),
        dateCreated.add(2.5, "d").format(ORDER_TRACKING_DATE_FORMAT),
        ...statusAfter2Days[2].date,
      ],
      fromStore: [null, null, ...statusAfter2Days[2].fromStore],
      location: [facility3, facility3, ...statusAfter2Days[2].location],
      activity: [
        "Departed from Facility",
        "Arrived at Facility",
        ...statusAfter2Days[2].activity,
      ],
    },
    statusAfter2Days[3],
    statusAfter2Days[4],
  ];
}
