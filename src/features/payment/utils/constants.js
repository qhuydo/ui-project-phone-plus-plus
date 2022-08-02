import moment from "moment";

export const TOTAL_PAYMENT_STEPS = 3;

export const STEPS = ["Contact details", "Payment", "Order confirmation"];

export const DELIVERY_DATE_FORMAT = "LLLL";
export const DELIVERY_METHODS = ["standard", "fast"];
export const DELIVERY_METHOD_TEXTS = {
  standard: "Standard delivery",
  fast: "Fast delivery",
};
export const DELIVERY_METHOD_HELPER_TEXTS1 = [
  `Estimated delivery date: ${moment()
    .add(4, "day")
    .format(DELIVERY_DATE_FORMAT)}`,
  `Estimated delivery date: ${moment()
    .add(4, "day")
    .format(DELIVERY_DATE_FORMAT)}`,
];
export const DELIVERY_METHOD_HELPER_TEXTS2 = [
  "Delivery fee: free of charge",
  "Delivery fee: 50.000đ",
];
