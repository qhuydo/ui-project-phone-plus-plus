import dayjs from "dayjs";
import { sampleOrder } from "features/order/assets";
import {
  getInitialOrderStatus,
  getCurrentStatus,
  getOrderStatusAfter4Days,
  getOrderStatusAfter2Days,
  ORDER_TRACKING_STEPS,
} from "features/order/utils";
import { ORDERS_KEY } from "features/payment/utils";

export function getAllOrders() {
  try {
    const items = window?.localStorage.getItem(ORDERS_KEY);
    return items ? JSON.parse(items) : [sampleOrder];
  } catch (error) {
    console.warn(`Error reading localStorage key “${ORDERS_KEY}”:`, error);
    return [];
  }
}

export async function findOrderById(id) {
  const savedOrders = getAllOrders();
  return savedOrders.find((order) => order.id === id) ?? null;
}

export async function refreshOrderStatus(order) {
  const savedOrders = getAllOrders();

  const orderIdx = savedOrders.findIndex((o) => o.id === order.id);
  // order = orderIdx !== -1 ? savedOrders[orderIdx] : null;

  if (order && !order.status) {
    const status = getInitialOrderStatus(order.timeStamp);
    const orderWithStatus = {
      ...order,
      status,
    };

    savedOrders[orderIdx] = orderWithStatus;
    window?.localStorage.setItem(ORDERS_KEY, JSON.stringify(savedOrders));
    return orderWithStatus;
  }

  if (order) {
    const currentStep = getCurrentStatus(order);
    const nDaysFromOrderCreatedDate = dayjs().diff(
      dayjs(order.timeStamp),
      "day"
    );
    let overwrite = false;
    let orderWithNewStatus = order;
    // console.log(order);
    if (
      currentStep.statusLabel === ORDER_TRACKING_STEPS.created &&
      nDaysFromOrderCreatedDate >= 2
    ) {
      orderWithNewStatus = {
        ...order,
        status: await getOrderStatusAfter2Days(order),
      };
      overwrite = true;
    } else if (
      currentStep.statusLabel === ORDER_TRACKING_STEPS.inTransit &&
      nDaysFromOrderCreatedDate >= 4
    ) {
      orderWithNewStatus = {
        ...order,
        status: await getOrderStatusAfter4Days(order),
        finishDelivery: true,
      };
      overwrite = true;
    }

    // console.log(orderWithNewStatus);
    // return orderWithNewStatus;

    if (overwrite) {
      savedOrders[orderIdx] = orderWithNewStatus;
      window?.localStorage.setItem(ORDERS_KEY, JSON.stringify(savedOrders));
    }
    return orderWithNewStatus;
  }

  return order;
}
