import { Stack } from "@mui/material";
import CartItemList from "features/cart/components/CartInfoSection/CartItemList";
import SupportPaymentTypes from "features/cart/components/CartInfoSection/SupportPaymentTypes";
import VoucherSection from "features/cart/components/CartInfoSection/VoucherSection";
import { useCartContext } from "features/cart/context/CartContext";

// export const cartItems = [
//   {
//     phone: phones[0],
//     colour: phones[0].colours[0],
//     version: phones[0].versions[0],
//     quantity: 1,
//   },
//   {
//     phone: phones[1],
//     colour: phones[1].colours[0],
//     version: phones[1].versions[0],
//     quantity: 1,
//   },
// ];

const CartInfoSection = () => {
  const { state } = useCartContext();
  return (
    <Stack direction="column" spacing={1} alignItems="center" width={1}>
      <CartItemList items={state.cartItems} />
      <SupportPaymentTypes />
      <VoucherSection />
    </Stack>
  );
};

export default CartInfoSection;
