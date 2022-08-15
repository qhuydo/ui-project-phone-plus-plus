import CartItem from "features/payment/components/Info/CartItem";
import { cartItemType, pushSaleType } from "features/cart/types";
import PropTypes from "prop-types";

const CartItemList = ({ cartItems, pushSaleMap, ...others }) => {
  return (
    <>
      {cartItems?.map((item, idx) => (
        <CartItem
          key={idx}
          item={item}
          pushSale={pushSaleMap ? pushSaleMap[item.phone.id] : undefined}
          {...others}
        />
      ))}
    </>
  );
};

CartItemList.propTypes = {
  cartItems: PropTypes.arrayOf(cartItemType),
  pushSaleMap: PropTypes.objectOf(pushSaleType),
};

export default CartItemList;
