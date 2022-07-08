import { Box } from "@mui/material";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "features/phones/components/Carousel/PhoneCardCarousel.css";
import PhoneBanner from "features/home/components/Banner/PhoneBanner";
import CarouselButton from "components/Button/CarouselButton";
import { LOREM_IPSUM } from "utils/constants";

const PREV_BUTTON_ID = "phone-banner-prev-button";
const NEXT_BUTTON_ID = "phone-banner-next-button";

const BANNERS = [
  {
    id: "0",
    imgSrc:
      "https://images.unsplash.com/photo-1634403665443-81dc4d75843a?&fit=crop&crop=left&w=4000&h=1800",
    title: "#OpenUp",
    subTitle: "To the next generation of Rotom Phone",
    content: LOREM_IPSUM,
  },
  {
    id: "1",
    imgSrc:
      "https://images.unsplash.com/photo-1519326882834-04c334752f58?fit=crop&w=4000&h=1800",
    title: "A Phone",
    subTitle: "Buy this phone please",
    content: LOREM_IPSUM,
    textColour: "#FFFFFF",
    textPosition: "top-right",
    textBoxWidth: "30%",
  },
  {
    id: "2",
    imgSrc:
      "https://images.unsplash.com/photo-1609177336889-4e69aa3b1ff6?fit=crop&crop=top&w=4000&h=1800",
    title: "Another Phone",
    subTitle: "Buy this phone please",
    content: LOREM_IPSUM,
    textPosition: "middle-left",
    textBoxWidth: "30%",
  },
];

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
        {BANNERS.map((banner) => (
          <SwiperSlide key={banner.id}>
            <PhoneBanner {...banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PhoneBannerCarousel;
