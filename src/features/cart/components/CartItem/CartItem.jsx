import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import ItemQuantityInput from "components/Input/ItemQuantityInput";
import { useCartItemContext } from "features/cart/context";
import { useCartContext } from "features/cart/context/CartContext";
import { usePhonePrice } from "hooks";
import { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Router } from "routes";
import { FALLBACK_IMG, GOLDEN_RATIO } from "utils/constants";

const CartItem = () => {
  const { cartItem, pushSale } = useCartItemContext();
  const { increaseItemQuantity, decreaseItemQuantity, removeItem } =
    useCartContext();

  const increaseQuantityCb = useCallback(
    () => increaseItemQuantity(cartItem),
    [cartItem, increaseItemQuantity]
  );

  const decreaseQuantityCb = useCallback(
    () => decreaseItemQuantity(cartItem),
    [cartItem, decreaseItemQuantity]
  );

  const { displayTotalPrice, pushSalePercentOff, displayPushSalePrice } =
    usePhonePrice(cartItem.version, cartItem.quantity, pushSale);

  return (
    <Stack direction="row" p={1} spacing={3}>
      <Box
        sx={(theme) => ({
          height: 80,
          aspectRatio: `${GOLDEN_RATIO}`,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "8px",
          overflow: "hidden",
          [theme.breakpoints.up("lg")]: {
            height: 185,
          },
        })}
      >
        <Box
          component="img"
          src={cartItem?.colour.thumbnail ?? FALLBACK_IMG}
          sx={{
            height: "100%",
            aspectRatio: `${GOLDEN_RATIO}`,
            objectFit: "cover",
            transition: `transform .3s`,
            transform: `scale(1.0)`,
            "&:hover": {
              transform: `scale(1.1)`,
            },
          }}
        />
      </Box>

      <Stack direction="column" flexGrow={1} spacing={pushSale ? 0.5 : 1}>
        <Stack
          direction="row"
          width={1}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Link
            color="inherit"
            underline="none"
            component={RouterLink}
            to={`${Router.getPhoneDetailsPage(
              cartItem.phone.id,
              cartItem.phone.name
            )}`}
            sx={{
              typography: "h6",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {cartItem.phone.name}
          </Link>

          <Typography variant="h6">{displayTotalPrice}</Typography>
        </Stack>

        <Stack
          direction="row"
          width={1}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="subtitle1" color="text.secondary">
            {`${cartItem.version.name}, ${cartItem.colour.colourName}`}
          </Typography>

          {(cartItem.quantity > 1 || pushSale) && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ textDecoration: pushSale ? "line-through" : null }}
            >
              {`${cartItem.version.displaySalePrice} per item`}
            </Typography>
          )}
        </Stack>

        {pushSale && (
          <Stack
            direction="row"
            width={1}
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="subtitle1" color="error.main">
              Save {pushSalePercentOff}%
            </Typography>

            <Typography
              variant="subtitle1"
              color={pushSale ? "error.main" : "text.secondary"}
            >
              {`${displayPushSalePrice} per item`}
            </Typography>
          </Stack>
        )}

        <Stack
          direction="row"
          width={1}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <ItemQuantityInput
            value={cartItem.quantity}
            onQuantityIncremented={increaseQuantityCb}
            onQuantityDecremented={decreaseQuantityCb}
          />

          <IconButton onClick={() => removeItem(cartItem)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>

        <Divider />

        <Stack
          direction="row"
          width={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="column" spacing={0.5}>
            <Typography>Insurance</Typography>
            <Typography variant="body2">Add PHONE++ care</Typography>
          </Stack>

          <Button variant="outlined" startIcon={<AddOutlinedIcon />}>
            Add
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
