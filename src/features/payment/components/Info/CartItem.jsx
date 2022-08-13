import { Paper, Stack, Typography } from "@mui/material";
import { cartItemType } from "features/cart/types";
import PropTypes from "prop-types";
import { GOLDEN_RATIO } from "utils/constants";
import formatNumberToVND from "utils/currency-formatter";

const CartItem = ({ item, showPrice, showQuantity, ...others }) => {
  return (
    <Stack direction="row" spacing={1} p={1} {...others}>
      <Paper
        variant="outlined"
        component="img"
        src={item.colour.thumbnail}
        sx={(theme) => ({
          width: 145,
          aspectRatio: `${GOLDEN_RATIO}`,
          borderRadius: `${theme.shape.borderRadius}px`,
        })}
      />

      <Stack direction="column" flexGrow={1}>
        <Stack direction="row" width={1} justifyContent="space-between">
          <Typography variant="h6">{item.phone.name}</Typography>
          {showPrice && (
            <Typography variant="h6">
              {formatNumberToVND(item.version.salePrice * item.quantity)}
            </Typography>
          )}
        </Stack>

        <Stack
          direction="row"
          width={1}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="subtitle1" color="text.secondary">
            {`${item.version.name}, ${item.colour.colourName}`}
          </Typography>

          {showPrice && (
            <Typography variant="subtitle1" color="text.secondary">
              {`${item.version.displaySalePrice} per item`}
            </Typography>
          )}
        </Stack>

        {showQuantity && (
          <Stack
            direction="row"
            width={1}
            justifyContent="end"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="subtitle1" color="text.secondary">
              {`Quantity: ${item.quantity}`}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

CartItem.defaultProps = {
  showPrice: true,
  showQuantity: true,
};

CartItem.propTypes = {
  item: cartItemType.isRequired,
  showPrice: PropTypes.bool,
  showQuantity: PropTypes.bool,
};

export default CartItem;
