import CartItem from "features/payment/components/Info/CartItem";
import { cartItemType } from "features/cart/types";
import PropTypes from "prop-types";

const CartItemList = ({ cartItems, ...others }) => {
  return (
    <>
      {cartItems?.map((item, idx) => (
        <CartItem key={idx} item={item} {...others} />
      ))}
    </>
  );
};

CartItemList.propTypes = {
  cartItems: PropTypes.arrayOf(cartItemType),
};

export default CartItemList;
