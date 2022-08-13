import { getRecommendedPhones } from "features/phones/api";
import { allPhones } from "features/phones/assets";

export async function getSpecialOfferItems(phoneIds, minItems) {
  let specialOffers = [];
  for (const id of phoneIds) {
    const phones = await getRecommendedPhones(id);
    if (phones.length !== 0) {
      specialOffers.push(...phones.filter(({ pushSale }) => pushSale !== null));
    }
  }

  for (const phone of allPhones) {
    if (specialOffers.length >= minItems) {
      break;
    }
    if (
      specialOffers.findIndex(({ phone: phone2 }) => phone2.id === phone.id) ===
      -1
    ) {
      specialOffers.push({ phone, pushSale: null });
    }
  }
  return specialOffers;
}
