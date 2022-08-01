import {
  calculateEstimatePrice,
  calculateSubtotalPrice,
  calculateSavingPrice,
} from "features/cart/utils";
import { useMemo } from "react";
import formatNumberToVND from "utils/currency-formatter";

export const useCheckoutPrices = (cartItems) => {
  const estimatePrice = useMemo(() => {
    return formatNumberToVND(calculateEstimatePrice(cartItems));
  }, [cartItems]);

  const subTotalPrice = useMemo(() => {
    return formatNumberToVND(calculateSubtotalPrice(cartItems));
  }, [cartItems]);

  const savingPrice = useMemo(() => {
    return formatNumberToVND(calculateSavingPrice(cartItems));
  }, [cartItems]);

  return [estimatePrice, subTotalPrice, savingPrice];
};
