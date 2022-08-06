import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { FALLBACK_IMG, GOLDEN_RATIO } from "utils/constants";
import { useCartItemContext } from "features/cart/context";
import ItemQuantityInput from "components/Input/ItemQuantityInput";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useCartContext } from "features/cart/context/CartContext";
import formatNumberToVND from "utils/currency-formatter";
import { Link as RouterLink } from "react-router-dom";
import { Router } from "routes";

const CartItem = () => {
  const { cartItem } = useCartItemContext();
  const { increaseItemQuantity, decreaseItemQuantity, removeItem } =
    useCartContext();

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

      <Stack direction="column" flexGrow={1} spacing={1}>
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

          <Typography variant="h6">
            {formatNumberToVND(cartItem.version.salePrice * cartItem.quantity)}
          </Typography>
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

          {cartItem.quantity > 1 && (
            <Typography variant="subtitle1" color="text.secondary">
              {`${cartItem.version.displaySalePrice} per item`}
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
          <ItemQuantityInput
            value={cartItem.quantity}
            onQuantityIncremented={() => increaseItemQuantity(cartItem)}
            onQuantityDecremented={() => decreaseItemQuantity(cartItem)}
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
