import { Stack, Typography } from "@mui/material";
import { phones } from "features/phones/assets";
import { shuffle } from "lodash-es";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";
import { useMemo } from "react";

const PeopleAlsoBuySection = () => {
  const offers = useMemo(() => {
    return shuffle(phones);
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
        People Also Buy
      </Typography>
      <Typography variant={"h6"} textAlign="center" sx={{ py: 1 }}>
        More to consider from our store
      </Typography>

      <PhoneCardCarousel
        phones={offers}
        phonesPerView={{
          xs: 1,
          sm: 1,
          md: 3,
          lg: 3,
          xl: 3,
        }}
      />
    </Stack>
  );
};

export default PeopleAlsoBuySection;