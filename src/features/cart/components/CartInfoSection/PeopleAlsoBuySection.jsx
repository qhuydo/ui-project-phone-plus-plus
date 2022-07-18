import { Stack, Typography } from "@mui/material";
import { allPhones } from "features/phones/assets";
import { shuffle } from "lodash-es";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";
import { useMemo } from "react";
import PropTypes from "prop-types";

const PeopleAlsoBuySection = ({ phonesPerView, maxItems }) => {
  const offers = useMemo(() => {
    return shuffle(allPhones).slice(0, maxItems);
  }, [maxItems]);

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
        id="cart-people-also-buy"
        phones={offers}
        phonesPerView={phonesPerView}
      />
    </Stack>
  );
};

PeopleAlsoBuySection.defaultProps = {
  phonesPerView: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 3,
  },
  maxItems: 4,
};

PeopleAlsoBuySection.propTypes = {
  phonesPerView: PropTypes.object,
  maxItems: PropTypes.number,
};

export default PeopleAlsoBuySection;
