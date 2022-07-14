import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { Box, Button, Divider, Rating, Stack, Typography } from "@mui/material";
import { usePhoneDetailsContext } from "features/phones/context";
import OutlinedChip from "components/Chip/OutlinedChip";
import ColourPairSelector from "features/phones/components/PhoneDetailSections/ColourPairSelector";
import { useCallback } from "react";
import PhoneVersionSelector from "features/phones/components/PhoneDetailSections/PhoneVersionSelector";
import ItemQuantityInput from "components/Input/ItemQuantityInput";

const PhoneDetailsHeader = () => {
  const {
    state: {
      phoneDetails,
      selectedVersion,
      selectedColour,
      priceOffPercentage,
    },
    changeColour,
    changeVersion,
  } = usePhoneDetailsContext();

  const onVersionChanged = useCallback(
    (e, value) => {
      const version = phoneDetails.versions.find((item) => item.id === value);
      if (version) {
        changeVersion(version);
      }
    },
    [changeVersion, phoneDetails.versions]
  );

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
          {selectedVersion.displaySalePrice}
        </Typography>

        <Typography
          variant="h4"
          color="text.secondary"
          sx={{
            textDecoration: "line-through",
          }}
        >
          {selectedVersion.displayOriginalPrice}
        </Typography>

        {priceOffPercentage !== 0 && !isNaN(priceOffPercentage) && (
          <OutlinedChip
            label={`Save ${parseInt(priceOffPercentage)}%`}
            sx={{ mr: 0.5, py: 2 }}
          />
        )}
      </Stack>

      <Typography
        variant="h6"
        fontWeight="regular"
      >{`Choose a phone's colour`}</Typography>

      <ColourPairSelector
        colours={phoneDetails.colours}
        value={selectedColour}
        onChange={changeColour}
      />

      <Typography
        variant="h6"
        fontWeight="regular"
      >{`Choose a phone's variant`}</Typography>

      <Box>
        <PhoneVersionSelector
          versions={phoneDetails.versions}
          value={selectedVersion}
          onChange={onVersionChanged}
        />
      </Box>

      <Typography variant="h6" fontWeight="regular">{`Quantity`}</Typography>

      <Box>
        {/*TODO*/}
        <ItemQuantityInput />
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
        >
          Add to cart
        </Button>
      </Stack>
    </Stack>
  );
};

export default PhoneDetailsHeader;
