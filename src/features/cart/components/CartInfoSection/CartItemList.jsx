import PropTypes from "prop-types";
import { List, ListItem } from "@mui/material";
import CartItem from "features/cart/components/CartItem/CartItem";
import { CartItemContextProvider } from "features/cart/context";

const CartItemList = ({ items }) => {
  return (
    <List py={2} sx={{ width: 1 }}>
      {items.map((item, idx) => (
        <ListItem key={idx} sx={{ width: 1, display: "block" }} divider>
          <CartItemContextProvider cartItem={item} key={idx}>
            <CartItem />
          </CartItemContextProvider>
        </ListItem>
      ))}
    </List>
  );
};

CartItemList.propTypes = {
  items: PropTypes.array,
};

export default CartItemList;
