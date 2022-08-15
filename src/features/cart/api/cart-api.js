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

export async function getPushSaleMap(cartItems) {
  const map = {};

  for (const item of cartItems) {
    if (item.phone.pushSales && item.phone.pushSales.length !== 0) {
      const id = item.phone.pushSales[0].phoneId;
      const idx = cartItems.findIndex((item) => item.phone.id === id);
      if (idx !== -1) {
        map[id] = item.phone.pushSales[0];
      }
    }
  }

  // console.log(map);
  return map;
}
