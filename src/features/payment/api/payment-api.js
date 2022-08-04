import { ORDERS_KEY } from "features/payment/utils";

export async function submitOrder(orderInfo) {
  const response = await fetch("https://uuid.rocks/ulid");
  const id = await response.text();

  const order = {
    id: id,
    timeStamp: new Date().getTime(),
    cartItems: orderInfo.cartItems,
    contactDetails: orderInfo.contactDetails,
    paymentMethod: orderInfo.paymentMethod,
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
