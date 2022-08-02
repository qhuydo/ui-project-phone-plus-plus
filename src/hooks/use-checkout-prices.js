import {
  calculateEstimatePrice,
  calculateSubtotalPrice,
  calculateSavingPrice,
} from "features/cart/utils";
import { useMemo } from "react";
import formatNumberToVND from "utils/currency-formatter";

const DELIVERY_FEE = 50_000;

export const useCheckoutPrices = (cartItems, addDeliveryFee) => {
  const deliveryFee = addDeliveryFee ? DELIVERY_FEE : 0;

  const estimatePrice = useMemo(() => {
    return formatNumberToVND(calculateEstimatePrice(cartItems) + deliveryFee);
  }, [cartItems, deliveryFee]);

  const subTotalPrice = useMemo(() => {
    return formatNumberToVND(calculateSubtotalPrice(cartItems));
  }, [cartItems]);

  const savingPrice = useMemo(() => {
    return formatNumberToVND(calculateSavingPrice(cartItems));
  }, [cartItems]);

  return [
    estimatePrice,
    subTotalPrice,
    savingPrice,
    formatNumberToVND(deliveryFee),
  ];
};
