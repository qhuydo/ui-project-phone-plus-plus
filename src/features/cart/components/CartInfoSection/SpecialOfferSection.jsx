import { Stack, Typography } from "@mui/material";
import { useCartContext } from "features/cart/context/CartContext";
import { PhoneCard } from "features/phones/components/Card";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";
import { PhoneCardContextProvider } from "features/phones/context";
import { useMemo, useCallback } from "react";
import { SwiperSlide } from "swiper/react";

const SpecialOfferSection = () => {
  const {
    state: { specialOffers },
  } = useCartContext();

  const offers = useMemo(() => {
    return specialOffers.slice(0, 3);
  }, [specialOffers]);

  const renderSpecialOfferCb = useCallback(
    () =>
      offers.map(({ phone, pushSale }) => (
        <SwiperSlide key={phone.id} className="phone-swiper-slide">
          <PhoneCardContextProvider phone={phone} pushSale={pushSale}>
            <PhoneCard />
          </PhoneCardContextProvider>
        </SwiperSlide>
      )),
    [offers]
  );

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
        renderPhoneCb={renderSpecialOfferCb}
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
