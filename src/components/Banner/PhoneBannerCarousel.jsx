import { Box } from "@mui/material";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../features/phones/components/Carousel/PhoneCardCarousel.css";
import PhoneBanner from "./PhoneBanner";
import CarouselButton from "components/Button/CarouselButton";

const PREV_BUTTON_ID = "phone-banner-prev-button";
const NEXT_BUTTON_ID = "phone-banner-next-button";

// TODO: refactor me
const PhoneBannerCarousel = () => {
  return (
    <Box position="relative">
      <CarouselButton id={PREV_BUTTON_ID} />

      <CarouselButton id={NEXT_BUTTON_ID} type="next" />

      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        navigation={{
          prevEl: `#${PREV_BUTTON_ID}`,
          nextEl: `#${NEXT_BUTTON_ID}`,
        }}
        modules={[Autoplay, Pagination, Navigation, Thumbs]}
      >
        {[...Array(5).keys()].map((key) => (
          <SwiperSlide key={key}>
            <PhoneBanner />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PhoneBannerCarousel;
