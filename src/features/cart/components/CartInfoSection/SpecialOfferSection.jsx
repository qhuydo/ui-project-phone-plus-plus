import { Stack, Typography } from "@mui/material";
import { shuffle } from "lodash-es";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";
import { useMemo } from "react";
import { allPhones } from "features/phones/assets";

const SpecialOfferSection = () => {
  const offers = useMemo(() => {
    return shuffle(allPhones).slice(0, 3);
  }, []);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      px={1}
      py={2}
      spacing={1}
      width={1}
    >
      <Typography variant={"h4"} textAlign="center">
        Special Offers
      </Typography>
      <Typography variant={"h6"} textAlign="center" sx={{ py: 1 }}>
        When you purchase any other products
      </Typography>

      <PhoneCardCarousel
        id="cart-special-offers"
        phones={offers}
        phonesPerView={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
        }}
      />
    </Stack>
  );
};

export default SpecialOfferSection;
