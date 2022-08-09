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
      dates: null,
      fromStores: null,
      locations: null,
      activities: null,
    },
    {
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.outForDelivery,
      dates: null,
      fromStores: null,
      locations: null,
      activities: null,
    },
    {
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.inTransit,
      dates: null,
      fromStores: null,
      locations: null,
      activities: null,
    },
    {
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.packed,
      dates: null,
      fromStores: null,
      locations: null,
      activities: null,
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.created,
      dates: [dayjs(dateCreated).format(ORDER_TRACKING_DATE_FORMAT)],
      fromStores: null,
      locations: null,
      activities: null,
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
  const fromStore = STORES[random(Object.keys(STORES).length - 1)];
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
      dates: null,
      fromStores: null,
      locations: null,
      activities: null,
    },
    {
      status: ORDER_STEP_STATUS.pending,
      statusLabel: ORDER_TRACKING_STEPS.outForDelivery,
      dates: null,
      fromStores: null,
      locations: null,
      activities: null,
    },
    {
      status: ORDER_STEP_STATUS.loading,
      statusLabel: ORDER_TRACKING_STEPS.inTransit,
      dates: [
        dateCreated.add(1.4, "d").format(ORDER_TRACKING_DATE_FORMAT),
        dateCreated.add(1.25, "d").format(ORDER_TRACKING_DATE_FORMAT),
        dateCreated.add(3.5, "h").format(ORDER_TRACKING_DATE_FORMAT),
        dateCreated.add(2, "h").format(ORDER_TRACKING_DATE_FORMAT),
      ],
      fromStores: [null, null, null, null],
      locations: [facility2, facility2, facility1, facility1],
      activities: [
        "Departed from Facility",
        "Arrived at Facility",
        "Departed from Facility",
        "Arrived at Facility",
      ],
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.packed,
      dates: [dateCreated.add(1, "h").format(ORDER_TRACKING_DATE_FORMAT)],
      fromStores: [fromStore.id],
      locations: [null],
      activities: ["Order packed, ready to be sent to our delivery partner"],
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.created,
      dates: [dateCreated.format(ORDER_TRACKING_DATE_FORMAT)],
      fromStores: null,
      locations: null,
      activities: null,
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
      dates: [dateCreated.add(3.85, "d").format(ORDER_TRACKING_DATE_FORMAT)],
      fromStores: [null],
      locations: [
        getAddressFromDeliveryDetails(order.contactDetails?.deliveryDetails),
      ],
      activities: ["Delivered by Duy Van (tel: 0912233125)"],
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.outForDelivery,
      dates: [dateCreated.add(3.25, "d").format(ORDER_TRACKING_DATE_FORMAT)],
      fromStores: [null],
      locations: [facility3],
      activities: [
        "Out for delivery today. Delivered by Duy Van (tel: 0912233125)",
      ],
    },
    {
      status: ORDER_STEP_STATUS.done,
      statusLabel: ORDER_TRACKING_STEPS.inTransit,
      dates: [
        dateCreated.add(3.25, "d").format(ORDER_TRACKING_DATE_FORMAT),
        dateCreated.add(2.5, "d").format(ORDER_TRACKING_DATE_FORMAT),
        ...statusAfter2Days[2].dates,
      ],
      fromStores: [null, null, ...statusAfter2Days[2].fromStores],
      locations: [facility3, facility3, ...statusAfter2Days[2].locations],
      activities: [
        "Departed from Facility",
        "Arrived at Facility",
        ...statusAfter2Days[2].activities,
      ],
    },
    statusAfter2Days[3],
    statusAfter2Days[4],
  ];
}
