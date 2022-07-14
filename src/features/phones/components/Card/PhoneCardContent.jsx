import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
  Box,
  Button,
  CardContent,
  Grid,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import OutlinedChip from "components/Chip/OutlinedChip";
import ColourSelector from "features/phones/components/Card/ColourSelector";
import PhonePropertySelector from "features/phones/components/Card/PhonePropertySelector";
import PropTypes from "prop-types";
import { usePhoneCardContext } from "features/phones/context";
import { useCartContext } from "features/cart/context/CartContext";
import { useCallback } from "react";

const PhoneCardContent = ({ /*isSelected,*/ sx }) => {
  const theme = useTheme();
  const {
    phone,
    selectedColour,
    changeColour,
    selectedVersion,
    changeVersion,
    priceOffPercentage,
  } = usePhoneCardContext();

  const { addItem } = useCartContext();

  const onCartItemAdded = useCallback(
    (e) => {
      e.preventDefault();
      return addItem({
        phone: phone,
        colour: selectedColour,
        version: selectedVersion,
        quantity: 1,
      });
    },
    [addItem, phone, selectedColour, selectedVersion]
  );

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
          alignItems="baseline"
          justifyContent="center"
          my={1}
        >
          {+priceOffPercentage !== 0 && !isNaN(+priceOffPercentage) && (
            <OutlinedChip
              label={`Save ${parseInt(priceOffPercentage)}%`}
              // isSelected={isSelected}
              sx={{ mr: 0.5 }}
            />
          )}

          <Typography
            sx={{ ml: 0.5 }}
            variant="button"
            fontSize={`${theme.typography.body1.fontSize}`}
          >
            {selectedVersion.displaySalePrice}
          </Typography>
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
