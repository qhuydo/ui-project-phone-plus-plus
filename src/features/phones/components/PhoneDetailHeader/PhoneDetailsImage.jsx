import { usePhoneDetailsContext } from "features/phones/context";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Box, Button, Stack } from "@mui/material";
import "./PhoneDetailsImage.css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import CarouselButton from "components/Button/CarouselButton";
import { useEffect, useState } from "react";

const PREV_BUTTON_ID = "phone-details-thumbnail-prev-button";
const NEXT_BUTTON_ID = "phone-details-thumbnail-next-button";

const PhoneDetailsImage = () => {
  const {
    state: { phoneDetails, selectedColour },
  } = usePhoneDetailsContext();

  const [thumbnailSwiper, setThumbnailSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  useEffect(() => {
    if (
      mainSwiper &&
      !mainSwiper.destroyed &&
      selectedColour?.slideIdx !== undefined
    ) {
      mainSwiper.slideTo(selectedColour?.slideIdx);

      const timer = setTimeout(() => {
        mainSwiper.update();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mainSwiper, selectedColour]);

  return (
    <Box position="relative" width={1} height="auto">
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
        watchSlidesProgress
        spaceBetween={10}
        onSwiper={setMainSwiper}
        thumbs={{ swiper: thumbnailSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        navigation={{
          enabled: true,
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
        onSwiper={setThumbnailSwiper}
        pagination
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress
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

      <Stack direction="row" spacing={1} width={1} pt={2}>
        <Button fullWidth variant="contained">
          View 3D model
        </Button>
        <Button fullWidth variant="outlined">
          Compare phone
        </Button>
      </Stack>
    </Box>
  );
};

export default PhoneDetailsImage;
