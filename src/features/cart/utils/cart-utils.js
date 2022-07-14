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
