export function getNumberOfCartItem(cartItems) {
  return cartItems.reduce(
    (partialSum, item) => partialSum + (item.quantity ?? 0),
    0
  );
}

export function calculateEstimatePrice(cartItems, pushSaleMap) {
  return cartItems.reduce((partialSum, item) => {
    const pushSale = pushSaleMap ? pushSaleMap[item.phone?.id ?? "-1"] : null;
    const salePrice =
      (pushSale ? pushSale.versions[item.version.id]?.pushSalePrice : null) ??
      item.version?.salePrice;

    return partialSum + (salePrice ?? 0) * (item.quantity ?? 0);
  }, 0);
}

export function calculateSubtotalPrice(cartItems) {
  return cartItems.reduce(
    (partialSum, item) =>
      partialSum + (item.version.originalPrice ?? 0) * (item.quantity ?? 0),
    0
  );
}

export function calculateSavingPrice(cartItems, pushSaleMap) {
  return (
    calculateSubtotalPrice(cartItems) -
    calculateEstimatePrice(cartItems, pushSaleMap)
  );
}

export function createCartItem(
  phone,
  selectedColour,
  selectedVersion,
  quantity
) {
  let colour = selectedColour;
  if (!selectedColour) {
    colour = phone.colours[0];
  }
  let version = selectedVersion;
  if (!selectedVersion) {
    version = phone.versions[0];
  }

  return {
    phone: phone,
    colour: colour,
    version: version,
    quantity: quantity > 1 ? quantity : 1,
  };
}

export function isCartItemTheSame(cartItem1, cartItem2) {
  return (
    cartItem1.phone.id === cartItem2.phone.id &&
    cartItem1.version.id === cartItem2.version.id &&
    cartItem1.colour.colour === cartItem2.colour.colour
  );
}
