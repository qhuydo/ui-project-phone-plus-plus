import { usePhoneDetailsContext } from "features/phones/context";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Box } from "@mui/material";
import "./PhoneDetailsImage.css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import CarouselButton from "components/Button/CarouselButton";

const PREV_BUTTON_ID = "phone-details-thumbnail-prev-button";
const NEXT_BUTTON_ID = "phone-details-thumbnail-next-button";

const PhoneDetailsImage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { phoneDetails } = usePhoneDetailsContext();
  return (
    <Box position="relative" width={1}>
      <CarouselButton
        id={PREV_BUTTON_ID}
        variant="outlined"
        sx={{ top: "40%" }}
        fontSize="large"
      />
      <CarouselButton
        id={NEXT_BUTTON_ID}
        type="next"
        variant="outlined"
        sx={{ top: "40%" }}
        fontSize="large"
      />

      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        navigation={{
          prevEl: `#${PREV_BUTTON_ID}`,
          nextEl: `#${NEXT_BUTTON_ID}`,
          disabledClass: "Mui-disabled",
        }}
        className="phone-details-swiper"
      >
        {phoneDetails.images.map((item, index) => (
          <SwiperSlide key={index}>
            <Box component="img" src={item} className="phone-details-img" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="phone-details-thumbnail-swiper"
      >
        {phoneDetails.images.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={item}
              className="phone-details-thumbnail"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PhoneDetailsImage;
