import { getInitialOrderStatus } from "features/order/utils";
import { ORDERS_KEY } from "features/payment/utils";

export async function submitOrder(orderInfo) {
  const response = await fetch("https://uuid.rocks/ulid");
  const id = await response.text();

  const createdDate = new Date().getTime();
  const order = {
    id: id,
    timeStamp: createdDate,
    cartItems: orderInfo.cartItems,
    contactDetails: orderInfo.contactDetails,
    paymentMethod: orderInfo.paymentMethod,
    status: getInitialOrderStatus(createdDate),
  };

  try {
    const items = window?.localStorage.getItem(ORDERS_KEY) ?? "[]";
    const savedOrders = items ? JSON.parse(items) : [];

    savedOrders.push(order);
    window?.localStorage.setItem(ORDERS_KEY, JSON.stringify(savedOrders));
  } catch (error) {
    console.warn(`Error reading localStorage key “${ORDERS_KEY}”:`, error);
  }

  return order;
}
