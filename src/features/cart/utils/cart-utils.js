export function getNumberOfCartItem(cartItems) {
  return cartItems.reduce(
    (partialSum, item) => partialSum + (item.quantity ?? 0),
    0
  );
}

export function calculateEstimatePrice(cartItems) {
  return cartItems.reduce(
    (partialSum, item) =>
      partialSum + (item.version.salePrice ?? 0) * (item.quantity ?? 0),
    0
  );
}

export function calculateSubtotalPrice(cartItems) {
  return cartItems.reduce(
    (partialSum, item) =>
      partialSum + (item.version.originalPrice ?? 0) * (item.quantity ?? 0),
    0
  );
}

export function calculateSavingPrice(cartItems) {
  return calculateSubtotalPrice(cartItems) - calculateEstimatePrice(cartItems);
}

export function createCartItem(
  phone,
  selectedColour,
  selectedVersion,
  quantity
) {
  return {
    phone: phone,
    colour: selectedColour,
    version: selectedVersion,
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
