import { useMemo } from "react";
import formatNumberToVND from "utils/currency-formatter";

export const usePhonePrice = (version, quantity, pushSale) => {
  const {
    originalPrice,
    salePrice,
    id: versionId,
  } = version ?? {
    originalPrice: 0,
    salePrice: 0,
    id: "0",
  };

  const percentOff = useMemo(() => {
    const percentRaw =
      originalPrice === salePrice
        ? 0
        : ((originalPrice - salePrice) / originalPrice) * 100;
    return parseInt(percentRaw);
  }, [originalPrice, salePrice]);

  const pushSalePrice = useMemo(() => {
    if (!pushSale) return 0;
    const currentPushSaleVersion = pushSale.versions[versionId];
    return currentPushSaleVersion?.pushSalePrice ?? 0;
  }, [pushSale, versionId]);

  const displayPushSalePrice = useMemo(() => {
    if (!pushSale) return "";
    const currentPushSaleVersion = pushSale.versions[versionId];
    return currentPushSaleVersion?.displayPushSalePrice ?? "";
  }, [pushSale, versionId]);

  const pushSalePercentOff = useMemo(() => {
    if (!pushSale) return 0;

    return parseInt(((originalPrice - pushSalePrice) / originalPrice) * 100);
  }, [originalPrice, pushSale, pushSalePrice]);

  const totalPrice = useMemo(() => {
    if (!pushSale) {
      return quantity * salePrice;
    }
    return quantity * pushSalePrice;
  }, [pushSale, pushSalePrice, quantity, salePrice]);

  const displayTotalPrice = useMemo(
    () => formatNumberToVND(totalPrice),
    [totalPrice]
  );

  return {
    percentOff,
    pushSalePrice,
    displayPushSalePrice,
    pushSalePercentOff,
    totalPrice,
    displayTotalPrice,
  };
};
