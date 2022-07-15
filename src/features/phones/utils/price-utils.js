import formatNumberToVND from "utils/currency-formatter";

export function calculatePhoneDetailsPrices(
  originalPrice,
  salePrice,
  quantity
) {
  const priceOffPercentage =
    originalPrice === salePrice
      ? 0
      : ((originalPrice - salePrice) / originalPrice) * 100;

  return {
    currentDisplayOriginalPrice: formatNumberToVND(originalPrice * quantity),
    currentDisplaySalePrice: formatNumberToVND(salePrice * quantity),
    priceOffPercentage: parseInt(priceOffPercentage),
  };
}
