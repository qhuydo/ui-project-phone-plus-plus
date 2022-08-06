import { ORDERS_KEY } from "features/payment/utils";

export function findOrderById(id) {
  try {
    const items = window?.localStorage.getItem(ORDERS_KEY) ?? "[]";
    const savedOrders = items ? JSON.parse(items) : [];

    return savedOrders.find((order) => order.id === id) ?? null;
  } catch (error) {
    console.warn(`Error reading localStorage key “${ORDERS_KEY}”:`, error);
  }

  return null;
}
