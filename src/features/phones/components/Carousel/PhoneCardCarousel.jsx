import { Box, useTheme } from "@mui/material";
import { PhoneCard, PhoneCardSkeleton } from "features/phones/components/Card";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "./PhoneCardCarousel.css";
import CarouselButton from "components/Button/CarouselButton";

// TODO: refactor me
const N_CARDS = 5;

const PREV_BUTTON_ID = "phone-carousel-prev-button";
const NEXT_BUTTON_ID = "phone-carousel-next-button";

const PhoneCardCarousel = () => {
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
        slidesPerView={1}
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
            slidesPerView: 2,
            spaceBetween: 4,
          },
          [theme.breakpoints.values["md"]]: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          [theme.breakpoints.values["lg"]]: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          [theme.breakpoints.values["xl"]]: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
        }}
      >
        {[...Array(N_CARDS).keys()].map((key) => (
          <SwiperSlide key={key} className="phone-swiper-slide">
            {isLoading ? <PhoneCardSkeleton /> : <PhoneCard />}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PhoneCardCarousel;
