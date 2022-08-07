import { getInitialOrderStatus } from "features/order/utils";
import { ORDERS_KEY } from "features/payment/utils";

export async function findOrderById(id) {
  try {
    const items = window?.localStorage.getItem(ORDERS_KEY) ?? "[]";
    const savedOrders = items ? JSON.parse(items) : [];

    return savedOrders.find((order) => order.id === id) ?? null;
  } catch (error) {
    console.warn(`Error reading localStorage key “${ORDERS_KEY}”:`, error);
  }

  return null;
}

export function refreshOrderStatus(id) {
  try {
    const items = window?.localStorage.getItem(ORDERS_KEY) ?? "[]";
    const savedOrders = items ? JSON.parse(items) : [];

    const orderIdx = savedOrders.findIndex((order) => order.id === id);
    const order = orderIdx !== -1 ? savedOrders[orderIdx] : null;
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
    return order;
  } catch (error) {
    console.warn(`Error reading localStorage key “${ORDERS_KEY}”:`, error);
  }

  return null;
}
