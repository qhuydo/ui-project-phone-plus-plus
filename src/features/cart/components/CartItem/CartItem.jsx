import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FALLBACK_IMG, GOLDEN_RATIO } from "utils/constants";
import { useCartItemContext } from "features/cart/context";
import ItemQuantityInput from "features/cart/components/CartItem/ItemQuantityInput";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const CartItem = () => {
  const { cartItem } = useCartItemContext();
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
          <Typography variant="h6">{cartItem.phone.name}</Typography>

          <Typography variant="h6">
            {cartItem.version.displaySalePrice}
          </Typography>
        </Stack>
        <Typography variant="subtitle1" color="text.secondary">
          {`${cartItem.version.name}, ${cartItem.colour.colourName}`}
        </Typography>

        <Stack
          direction="row"
          width={1}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <ItemQuantityInput value={cartItem.quantity} />

          <IconButton>
            <DeleteOutlinedIcon />
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
