import { Box, useTheme } from "@mui/material";
import { PhoneCard, PhoneCardSkeleton } from "features/phones/components/Card";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "./PhoneCardCarousel.css";
import CarouselButton from "components/Button/CarouselButton";
import PropTypes from "prop-types";
import { PhoneCardContextProvider } from "features/phones/context/PhoneCardContext";

const PREV_BUTTON_ID = "phone-carousel-prev-button";
const NEXT_BUTTON_ID = "phone-carousel-next-button";

const PhoneCardCarousel = ({ phones, phonesPerView }) => {
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Box position="relative">
      <CarouselButton id={PREV_BUTTON_ID} />

      <CarouselButton id={NEXT_BUTTON_ID} type="next" />

      <Swiper
        className="phone-swiper"
        slidesPerView={phonesPerView.xs}
        spaceBetween={8}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        navigation={{
          prevEl: `#${PREV_BUTTON_ID}`,
          nextEl: `#${NEXT_BUTTON_ID}`,
          disabledClass: "Mui-disabled",
        }}
        modules={[Pagination, Navigation, Thumbs]}
        breakpoints={{
          [theme.breakpoints.values["sm"]]: {
            slidesPerView: phonesPerView.sm,
            spaceBetween: 4,
          },
          [theme.breakpoints.values["md"]]: {
            slidesPerView: phonesPerView.md,
            spaceBetween: 8,
          },
          [theme.breakpoints.values["lg"]]: {
            slidesPerView: phonesPerView.lg,
            spaceBetween: 12,
          },
          [theme.breakpoints.values["xl"]]: {
            slidesPerView: phonesPerView.xl,
            spaceBetween: 12,
          },
        }}
      >
        {isLoading &&
          [...Array(phonesPerView.xl).keys()].map((key) => (
            <SwiperSlide key={key} className="phone-swiper-slide">
              <PhoneCardSkeleton key={key} />
            </SwiperSlide>
          ))}
        {!isLoading &&
          phones.map((phone) => (
            <SwiperSlide key={phone.id} className="phone-swiper-slide">
              <PhoneCardContextProvider phone={phone}>
                <PhoneCard />
              </PhoneCardContextProvider>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

PhoneCardCarousel.defaultProps = {
  phonesPerView: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
};

PhoneCardCarousel.propTypes = {
  phones: PropTypes.array,
  phonesPerView: PropTypes.object,
};

export default PhoneCardCarousel;
