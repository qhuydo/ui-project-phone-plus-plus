import { Paper, Stack, Typography, Link } from "@mui/material";
import { cartItemType, pushSaleType } from "features/cart/types";
import { usePhonePrice } from "hooks";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Router } from "routes";
import { GOLDEN_RATIO } from "utils/constants";

const CartItem = ({ item, showPrice, showQuantity, pushSale, ...others }) => {
  const { displayTotalPrice, displayPushSalePrice, percentOff } = usePhonePrice(
    item?.version,
    item?.quantity,
    pushSale
  );

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
          <Link
            color="inherit"
            underline="none"
            component={RouterLink}
            to={`${Router.getPhoneDetailsPage(item.phone.id, item.phone.name)}`}
            sx={{
              typography: "h6",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            <Typography variant="h6">{item.phone.name}</Typography>
          </Link>
          {showPrice && (
            <Typography variant="h6">{displayTotalPrice}</Typography>
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
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                textDecoration: pushSale ? "line-through" : null,
              }}
            >
              {`${item.version.displaySalePrice} per item`}
            </Typography>
          )}
        </Stack>

        {pushSale && (
          <Stack
            direction="row"
            width={1}
            justifyContent="space-between"
            spacing={1}
          >
            <Typography variant="subtitle1" color="error">
              Save {percentOff}%
            </Typography>

            <Typography variant="subtitle1" color="error">
              {`${displayPushSalePrice} per item`}
            </Typography>
          </Stack>
        )}

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
  pushSale: pushSaleType,
};

export default CartItem;
