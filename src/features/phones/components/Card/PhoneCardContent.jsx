import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
  Box,
  Button,
  CardContent,
  Grid,
  Rating,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useCartContext } from "features/cart/context/CartContext";
import { createCartItem } from "features/cart/utils";
import { usePaymentContext } from "features/payment/context";
import ColourSelector from "features/phones/components/Card/ColourSelector";
import PhonePropertySelector from "features/phones/components/Card/PhonePropertySelector";
import { usePhoneCardContext } from "features/phones/context";
import { usePhonePrice } from "hooks";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Router } from "routes";

const PhoneCardContent = ({ sx }) => {
  const theme = useTheme();
  const {
    phone,
    selectedColour,
    changeColour,
    selectedVersion,
    changeVersion,
    priceOffPercentage,
    pushSale,
    avgRating,
  } = usePhoneCardContext();

  const { addItem } = useCartContext();
  const { buyNow } = usePaymentContext();

  const navigate = useNavigate();

  const onCartItemAdded = useCallback(
    (e) => {
      e.preventDefault();
      return addItem(createCartItem(phone, selectedColour, selectedVersion));
    },
    [addItem, phone, selectedColour, selectedVersion]
  );

  const onBuyNowButtonClicked = useCallback(
    (e) => {
      e.preventDefault();

      buyNow(createCartItem(phone, selectedColour, selectedVersion));
      navigate(Router.PAYMENT);
    },
    [buyNow, navigate, phone, selectedColour, selectedVersion]
  );

  const onCompareButtonClicked = useCallback(
    (e) => {
      e.preventDefault();
      navigate(Router.getPhoneComparePage([phone.id]));
    },
    [navigate, phone?.id]
  );

  const { displayPushSalePrice, pushSalePercentOff, percentOff } =
    usePhonePrice(selectedVersion, 1, pushSale);

  return (
    <CardContent component={Box} display="flex" flexDirection="column" sx={sx}>
      <Grid container flexDirection="row" columnSpacing={1}>
        <Grid item container alignItems="center" justifyContent="center">
          <ColourSelector
            colours={phone.colours}
            selectedColour={selectedColour}
            onColourSelected={changeColour}
          />
        </Grid>

        <Grid item container alignItems="center" justifyContent="center">
          <PhonePropertySelector
            properties={phone.versions}
            selectedProperty={selectedVersion}
            onPropertySelected={changeVersion}
          />
        </Grid>

        <Grid
          container
          item
          flexDirection="row"
          justifyContent="center"
          alignItems="baseline"
          mt={1}
        >
          <Typography
            sx={{ ml: 0.5, textDecoration: "line-through" }}
            variant="button"
            color={pushSale ? "error.main" : "text.secondary"}
            fontSize={`${theme.typography.body1.fontSize}`}
          >
            {pushSale ||
            (+priceOffPercentage !== 0 && !isNaN(+priceOffPercentage)) ? (
              `${selectedVersion.displayOriginalPrice}`
            ) : (
              <span>&nbsp;&nbsp;&nbsp;</span>
            )}
          </Typography>

          {!pushSale &&
            +priceOffPercentage !== 0 &&
            !isNaN(+priceOffPercentage) && (
              <Typography sx={{ ml: 1 }}>{`-${percentOff}%`}</Typography>
            )}

          {pushSale && (
            <Typography
              fontWeight={pushSale ? "bold" : null}
              color={pushSale ? "error.main" : null}
              sx={{ ml: 1 }}
            >{`-${pushSalePercentOff}%`}</Typography>
          )}
        </Grid>

        <Grid
          container
          item
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          color={pushSale ? "error.main" : null}
          fontWeight={pushSale ? "bold" : null}
          mb={1}
        >
          <Typography
            sx={{ mr: 0.5 }}
            variant="button"
            fontSize={`${theme.typography.body1.fontSize}`}
          >
            {!pushSale && selectedVersion.displaySalePrice}
            {pushSale && displayPushSalePrice}
          </Typography>

          {pushSale && pushSale.description && (
            <Tooltip title={pushSale.description}>
              <InfoOutlinedIcon sx={{ ml: 0.5 }} />
            </Tooltip>
          )}
        </Grid>

        <Grid
          item
          container
          flexDirection="row"
          alignItems="end"
          justifyContent="center"
        >
          <Rating
            size="medium"
            value={+avgRating}
            precision={0.5}
            readOnly
            sx={{ mr: 0.5 }}
          />
          <Typography variant="caption" sx={{ ml: 0.5 }}>
            {`(${phone.comments?.length ?? 0})`}
          </Typography>
        </Grid>
      </Grid>

      <Grid item container flexDirection="column" rowSpacing={1} mt={1.25}>
        <Button
          variant="contained"
          startIcon={<PaymentOutlinedIcon />}
          onClick={onBuyNowButtonClicked}
        >
          Buy now
        </Button>

        <Button
          variant="outlined"
          sx={{
            mt: 1,
            "&.MuiButton-outlinedPrimary": {
              border: "2px solid",
            },
          }}
          startIcon={<AddShoppingCartOutlinedIcon />}
          onClick={onCartItemAdded}
        >
          Add to cart
        </Button>

        <Button
          variant="text"
          sx={{
            width: 1,
            mt: 1,
            "&:hover": {
              textDecoration: "underline",
            },
            textDecoration: "none",
          }}
          onClick={onCompareButtonClicked}
        >
          Compare
        </Button>
      </Grid>
    </CardContent>
  );
};

PhoneCardContent.propTypes = {
  isSelected: PropTypes.bool,
  sx: PropTypes.any,
};

export default PhoneCardContent;
