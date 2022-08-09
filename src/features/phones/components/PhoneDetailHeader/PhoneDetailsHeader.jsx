import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
import { BigButton } from "components/Button";
import OutlinedChip from "components/Chip/OutlinedChip";
import ItemQuantityInput from "components/Input/ItemQuantityInput";
import { useCartContext } from "features/cart/context/CartContext";
import { createCartItem } from "features/cart/utils";
import { usePaymentContext } from "features/payment/context";
import ColourPairSelector from "features/phones/components/PhoneDetailHeader/ColourPairSelector";
import PhoneVersionSelector from "features/phones/components/PhoneDetailHeader/PhoneVersionSelector";
import {
  useFavouritePhoneMap,
  usePhoneDetailsContext,
} from "features/phones/context";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Router from "routes/router";
import { GOLDEN_RATIO } from "utils/constants";

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
      avgRating,
    },
    changeColour,
    changeVersion,
    changeQuantity,
  } = usePhoneDetailsContext();

  const navigate = useNavigate();

  const [favourites, toggleFavourites] = useFavouritePhoneMap();

  const isFavourite = useMemo(() => {
    return favourites[phoneDetails.id];
  }, [favourites, phoneDetails.id]);

  const { addItem } = useCartContext();
  const { buyNow } = usePaymentContext();

  const onFavouriteButtonClicked = useCallback(() => {
    toggleFavourites(phoneDetails.id);
  }, [phoneDetails.id, toggleFavourites]);

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

  const buyNowItem = useCallback(() => {
    buyNow(
      createCartItem(phoneDetails, selectedColour, selectedVersion, quantity)
    );
    navigate(Router.PAYMENT);
  }, [
    buyNow,
    navigate,
    phoneDetails,
    quantity,
    selectedColour,
    selectedVersion,
  ]);

  return (
    <Stack direction="column" spacing={1} width={1}>
      <Typography variant="h2" flexWrap>
        {phoneDetails.name}
      </Typography>

      <Box>
        <Button
          color="error"
          onClick={onFavouriteButtonClicked}
          startIcon={isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        >
          {!isFavourite ? "Add to favourite" : "Remove from favourite"}
        </Button>
      </Box>

      <Stack direction="row" spacing={1} alignItems="center">
        <Rating
          size="large"
          value={+avgRating}
          precision={0.5}
          readOnly
          sx={{ mr: 0.5 }}
        />
        <Typography variant="h6" sx={{ ml: 0.5 }}>
          {`(${phoneDetails.comments?.length ?? 0} ${
            phoneDetails.comments?.length === 1 ? "rating" : "ratings"
          })`}
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography variant="h6">
          {phoneDetails.nSold > 0 ? `Sold: ${phoneDetails.nSold}` : "New"}
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: "column", xl: "row" }}
        spacing={{ xs: 0.5, xl: 3 }}
        alignItems="baseline"
      >
        <Typography variant="h3" fontWeight="bold">
          {currentDisplaySalePrice}
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 0.5, md: 3 }}
          alignItems="baseline"
        >
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
      </Stack>

      <Stack
        direction="column"
        display="block"
        py={{ xs: 0, md: 0.5 }}
        spacing={0.5}
      >
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
              aspectRatio: `${GOLDEN_RATIO}`,
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

      <Stack
        direction="column"
        display="block"
        py={{ xs: 0, md: 0.5 }}
        spacing={0.5}
      >
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
        <BigButton
          fullWidth
          variant="contained"
          size="large"
          startIcon={<PaymentOutlinedIcon />}
          onClick={buyNowItem}
        >
          Buy now
        </BigButton>

        <BigButton
          fullWidth
          size="large"
          variant="outlined"
          startIcon={<AddShoppingCartOutlinedIcon />}
          onClick={addItemToCart}
        >
          Add to cart
        </BigButton>
      </Stack>
    </Stack>
  );
};

export default PhoneDetailsHeader;
