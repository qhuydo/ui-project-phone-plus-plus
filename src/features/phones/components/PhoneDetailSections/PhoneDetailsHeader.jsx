import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { usePhoneDetailsContext } from "features/phones/context";
import OutlinedChip from "components/Chip/OutlinedChip";
import ColourPairSelector from "features/phones/components/PhoneDetailSections/ColourPairSelector";
import { useCallback } from "react";
import PhoneVersionSelector from "features/phones/components/PhoneDetailSections/PhoneVersionSelector";
import ItemQuantityInput from "components/Input/ItemQuantityInput";
import { GOLDEN_RATIO } from "utils/constants";
import { useCartContext } from "features/cart/context/CartContext";
import { createCartItem } from "features/cart/utils";

const PhoneDetailsHeader = () => {
  const {
    state: {
      phoneDetails,
      selectedVersion,
      selectedColour,
      priceOffPercentage,
      colourChanged,
      currentDisplayOriginalPrice,
      currentDisplaySalePrice,
      quantity,
    },
    changeColour,
    changeVersion,
    changeQuantity,
  } = usePhoneDetailsContext();

  const { addItem } = useCartContext();

  const onVersionChanged = useCallback(
    (e, value) => {
      const version = phoneDetails.versions.find((item) => item.id === value);
      if (version) {
        changeVersion(version);
      }
    },
    [changeVersion, phoneDetails.versions]
  );

  const increaseQuantity = useCallback(() => {
    changeQuantity(quantity + 1);
  }, [changeQuantity, quantity]);

  const decreaseQuantity = useCallback(() => {
    changeQuantity(quantity - 1);
  }, [changeQuantity, quantity]);

  const addItemToCart = useCallback(() => {
    addItem(
      createCartItem(phoneDetails, selectedColour, selectedVersion, quantity)
    );
  }, [addItem, phoneDetails, selectedColour, selectedVersion, quantity]);

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h2">{phoneDetails.name}</Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <Rating
          size="large"
          value={phoneDetails.ratingPoints}
          precision={0.5}
          readOnly
          sx={{ mr: 0.5 }}
        />
        <Typography variant="h6" sx={{ ml: 0.5 }}>
          {`(${phoneDetails.numberOfRatings} ${
            phoneDetails.numberOfRatings === 1 ? "rating" : "ratings"
          })`}
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography variant="h6">
          {phoneDetails.nSold > 0 ? `Sold: ${phoneDetails.nSold}` : "New"}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={3} alignItems="baseline">
        <Typography variant="h3" fontWeight="bold">
          {currentDisplaySalePrice}
        </Typography>

        <Typography
          variant="h4"
          color="text.secondary"
          sx={{
            textDecoration: "line-through",
          }}
        >
          {currentDisplayOriginalPrice}
        </Typography>

        {priceOffPercentage !== 0 && !isNaN(priceOffPercentage) && (
          <OutlinedChip
            label={`Save ${parseInt(priceOffPercentage)}%`}
            sx={{ mr: 0.5, py: 2 }}
          />
        )}
      </Stack>

      <Stack direction="column" display="block" py={0.5} spacing={0.5}>
        {phoneDetails.colours.length > 1 && (
          <Typography
            variant="h6"
            fontWeight="regular"
          >{`Choose a phone's colour`}</Typography>
        )}

        <ColourPairSelector
          colours={phoneDetails.colours}
          value={selectedColour}
          onChange={changeColour}
        />

        <Collapse in={colourChanged}>
          <Box
            component="img"
            src={selectedColour.thumbnail}
            sx={(theme) => ({
              height: 80,
              aspectRatio: `${GOLDEN_RATIO}px`,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: `${theme.shape.borderRadius}px`,
              [theme.breakpoints.up("md")]: {
                height: 100,
              },
              [theme.breakpoints.up("lg")]: {
                height: 120,
              },
            })}
          />
        </Collapse>
      </Stack>

      <Stack direction="column" display="block" py={0.5} spacing={0.5}>
        {phoneDetails.versions.length > 1 && (
          <Typography
            variant="h6"
            fontWeight="regular"
          >{`Choose a phone's variant`}</Typography>
        )}

        <PhoneVersionSelector
          versions={phoneDetails.versions}
          value={selectedVersion}
          onChange={onVersionChanged}
        />
      </Stack>

      <Typography variant="h6" fontWeight="regular">{`Quantity`}</Typography>

      <Box>
        <ItemQuantityInput
          value={quantity}
          onQuantityIncremented={increaseQuantity}
          onQuantityDecremented={decreaseQuantity}
        />
      </Box>

      <Stack direction="row" spacing={1} width={1} pt={2}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<PaymentOutlinedIcon />}
        >
          Buy now
        </Button>

        <Button
          fullWidth
          size="large"
          variant="outlined"
          startIcon={<AddShoppingCartOutlinedIcon />}
          onClick={addItemToCart}
        >
          Add to cart
        </Button>
      </Stack>
    </Stack>
  );
};

export default PhoneDetailsHeader;
