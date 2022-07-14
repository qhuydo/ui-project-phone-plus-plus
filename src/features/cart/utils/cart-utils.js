export function getNumberOfCartItem(cartItems) {
  return cartItems.reduce(
    (partialSum, item) => partialSum + (item.quantity ?? 0),
    0
  );
}
