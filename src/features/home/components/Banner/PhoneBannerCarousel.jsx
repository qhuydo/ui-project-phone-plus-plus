import { Box } from "@mui/material";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "features/phones/components/Carousel/PhoneCardCarousel.css";
import PhoneBanner from "features/home/components/Banner/PhoneBanner";
import CarouselButton from "components/Button/CarouselButton";
import { banners } from "features/home/assets";

const PREV_BUTTON_ID = "phone-banner-prev-button";
const NEXT_BUTTON_ID = "phone-banner-next-button";

// TODO: refactor me
const PhoneBannerCarousel = () => {
  return (
    <Box
      position="relative"
      width={1}
      m={0}
      p={0}
      sx={{ verticalAlign: "top" }}
    >
      <CarouselButton id={PREV_BUTTON_ID} sx={{ left: 8 }} />

      <CarouselButton id={NEXT_BUTTON_ID} type="next" sx={{ right: 8 }} />

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
          disabledClass: "Mui-disabled",
        }}
        modules={[Autoplay, Pagination, Navigation, Thumbs]}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <PhoneBanner {...banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PhoneBannerCarousel;
