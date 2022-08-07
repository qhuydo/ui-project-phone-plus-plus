import {
  VisaLogo,
  MastercardLogo,
  PaypalLogo,
  DollarBanknote,
} from "features/cart/assets";
import { getEstimatedDeliveryDate } from "features/order/utils";

export const TOTAL_PAYMENT_STEPS = 3;

export const STEPS = ["Contact details", "Payment", "Order confirmation"];

export const DELIVERY_DATE_FORMAT = "dddd, LL";
export const DELIVERY_METHODS = ["standard", "fast"];
export const DELIVERY_METHOD_TEXTS = {
  standard: "Standard delivery",
  fast: "Fast delivery",
};
export const DELIVERY_METHOD_HELPER_TEXTS1 = [
  `Estimated delivery date: ${getEstimatedDeliveryDate(DELIVERY_METHODS[0])}`,
  `Estimated delivery date: ${getEstimatedDeliveryDate(DELIVERY_METHODS[1])}`,
];
export const DELIVERY_METHOD_HELPER_TEXTS2 = [
  "Delivery fee: free of charge",
  "Delivery fee: 50.000đ",
];

export const PAYMENT_TYPES = {
  visa: {
    name: "Visa",
    src: VisaLogo,
  },
  masterCard: {
    name: "Mastercard",
    src: MastercardLogo,
  },
  paypal: {
    name: "Paypal",
    src: PaypalLogo,
  },
  cod: {
    name: "Cash on delivery",
    src: DollarBanknote,
  },
};

export const PAYMENT_METHODS = {
  cod: "cod",
  creditOrDebitCard: "creditOrDebitCard",
  paypal: "paypal",
};

export const PAYMENT_METHOD_TEXTS = {
  cod: "Cash on delivery (COD)",
  creditOrDebitCard: "Credit card or Debit card",
  paypal: "Paypal",
};

export const ORDERS_KEY = "orders";
