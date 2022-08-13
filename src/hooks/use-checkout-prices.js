import {
  calculateEstimatePrice,
  calculateSubtotalPrice,
  calculateSavingPrice,
} from "features/cart/utils";
import { useMemo } from "react";
import formatNumberToVND from "utils/currency-formatter";

const DELIVERY_FEE = 50_000;

export const useCheckoutPrices = (cartItems, deliveryMethod, pushSaleMap) => {
  const deliveryFee = useMemo(
    () => (deliveryMethod === "fast" ? DELIVERY_FEE : 0),
    [deliveryMethod]
  );

  const estimatePrice = useMemo(() => {
    return formatNumberToVND(
      calculateEstimatePrice(cartItems, pushSaleMap) + deliveryFee
    );
  }, [cartItems, deliveryFee, pushSaleMap]);

  const subTotalPrice = useMemo(() => {
    return formatNumberToVND(calculateSubtotalPrice(cartItems));
  }, [cartItems]);

  const savingPrice = useMemo(() => {
    return formatNumberToVND(calculateSavingPrice(cartItems));
  }, [cartItems]);

  return {
    estimatePrice,
    subTotalPrice,
    savingPrice,
    deliveryFee: formatNumberToVND(deliveryFee),
  };
};
