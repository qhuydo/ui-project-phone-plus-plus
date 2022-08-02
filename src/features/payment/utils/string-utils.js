import { provinces } from "features/payment/assets";

export function getAddressFromDeliveryDetails(deliveryDetails) {
  if (!deliveryDetails) return "";
  const { provinceId, districtId, communeId } = deliveryDetails;
  return [
    deliveryDetails.street ?? "",
    provinces[provinceId]?.districts[districtId]?.communes[communeId]?.name ??
      "",
    provinces[provinceId]?.districts[districtId].name ?? "",
    provinces[provinceId].name ?? "",
  ].join(", ");
}
