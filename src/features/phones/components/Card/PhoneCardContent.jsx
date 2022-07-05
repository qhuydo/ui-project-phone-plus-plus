import {
  Box,
  Button,
  CardContent,
  Grid,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import OutlinedChip from "components/Chip/OutlinedChip";
import ColourSelector from "features/phones/components/Card/ColourSelector";
import { useState } from "react";
import PhonePropertySelector from "features/phones/components/Card/PhonePropertySelector";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

const PHONE_COLOURS = ["#4496E0", "#202B6D", "#00AB55"];
const PHONE_PROPERTIES = ["128GB", "256GB"];

const PhoneCardContent = ({ /*isSelected,*/ sx }) => {
  const theme = useTheme();
  const [selectedColour, setSelectedColour] = useState("#4496E0");
  const [selectedProperty, setSelectedProperty] = useState("128GB");

  return (
    <CardContent component={Box} display="flex" flexDirection="column" sx={sx}>
      <Grid container flexDirection="row" columnSpacing={1}>
        <Grid item container alignItems="center" justifyContent="center">
          <ColourSelector
            colours={PHONE_COLOURS}
            selectedColour={selectedColour}
            onColourSelected={(colour) => setSelectedColour(colour)}
          />
        </Grid>

        <Grid item container alignItems="center" justifyContent="center">
          <PhonePropertySelector
            properties={PHONE_PROPERTIES}
            selectedProperty={selectedProperty}
            onPropertySelected={setSelectedProperty}
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
          <OutlinedChip
            label="Save 5%"
            // isSelected={isSelected}
            sx={{ mr: 0.5 }}
          />
          <Typography
            sx={{ ml: 0.5 }}
            variant="button"
            fontSize={`${theme.typography.body1.fontSize}`}
          >
            6.900.000₫
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
            value={5.0}
            precision={0.5}
            readOnly
            sx={{ mr: 0.5 }}
          />
          <Typography variant="caption" sx={{ ml: 0.5 }}>
            (120)
          </Typography>
        </Grid>
      </Grid>

      <Grid item container flexDirection="column" rowSpacing={1} mt={1.25}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PaymentOutlinedIcon />}
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
