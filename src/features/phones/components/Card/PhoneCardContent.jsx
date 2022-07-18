import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
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
import ColourSelector from "features/phones/components/Card/ColourSelector";
import PhonePropertySelector from "features/phones/components/Card/PhonePropertySelector";
import PropTypes from "prop-types";
import { usePhoneCardContext } from "features/phones/context";
import { useCartContext } from "features/cart/context/CartContext";
import { useCallback, useMemo } from "react";
import { createCartItem } from "features/cart/utils";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
  } = usePhoneCardContext();

  const { addItem } = useCartContext();

  const onCartItemAdded = useCallback(
    (e) => {
      e.preventDefault();
      return addItem(createCartItem(phone, selectedColour, selectedVersion));
    },
    [addItem, phone, selectedColour, selectedVersion]
  );

  const percentOff = useMemo(
    () => parseInt(priceOffPercentage),
    [priceOffPercentage]
  );

  const pushSalePercentOff = useMemo(() => {
    if (pushSale === null) return 0;

    const currentPushSaleVersion = pushSale.versions[selectedVersion.id];

    // console.log(selectedVersion);
    // console.log(currentPushSaleVersion);

    const percentOff =
      ((selectedVersion.originalPrice - currentPushSaleVersion.pushSalePrice) /
        selectedVersion.originalPrice) *
      100;

    return parseInt(percentOff);
  }, [pushSale, selectedVersion]);

  const displayPushSalePrice = useMemo(() => {
    if (pushSale === null) return "0";

    const currentPushSaleVersion = pushSale.versions[selectedVersion.id];
    return currentPushSaleVersion.displayPushSalePrice;
  }, [pushSale, selectedVersion.id]);

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
          alignItems="center"
          justifyContent="center"
        >
          <Rating
            size="medium"
            value={phone.ratingPoints}
            precision={0.5}
            readOnly
            sx={{ mr: 0.5 }}
          />
          <Typography variant="caption" sx={{ ml: 0.5 }}>
            {`(${phone.numberOfRatings})`}
          </Typography>
        </Grid>
      </Grid>

      <Grid item container flexDirection="column" rowSpacing={1} mt={1.25}>
        <Button variant="contained" startIcon={<PaymentOutlinedIcon />}>
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
            mt: 1,
            "&:hover": {
              textDecoration: "underline",
            },
            textDecoration: "none",
          }}
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
