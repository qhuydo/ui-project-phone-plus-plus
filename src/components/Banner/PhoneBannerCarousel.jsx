import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { alpha, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../features/phones/components/Carousel/PhoneCardCarousel.css";
import PhoneBanner from "./PhoneBanner";
// TODO: refactor me
const PhoneBannerCarousel = () => {
  const theme = useTheme();
  return (
    <Box position="relative">
      <Box
        id="phone-banner-prev-button"
        style={{
          position: "absolute",
          top: "40%",
          zIndex: 10,
          left: -10,
          transform: "translateY(-50%)",
          background: alpha(theme.palette.grey[500], 0.4),
          borderRadius: "50%",
        }}
        role="button"
      >
        <Tooltip title={"Previous slide"}>
          <IconButton>
            <NavigateBeforeIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        id="phone-banner-next-button"
        style={{
          position: "absolute",
          top: "40%",
          zIndex: 10,
          right: -10,
          transform: "translateY(-50%)",
          background: alpha(theme.palette.grey[500], 0.4),
          borderRadius: "50%",
        }}
        role="button"
      >
        <Tooltip title={"Next slide"}>
          <IconButton>
            <NavigateNextIcon />
          </IconButton>
        </Tooltip>
      </Box>

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
          prevEl: "#phone-banner-prev-button",
          nextEl: "#phone-banner-next-button",
        }}
        modules={[Autoplay, Pagination, Navigation, Thumbs]}
      >
        <SwiperSlide>
          <PhoneBanner />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneBanner />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneBanner />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneBanner />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneBanner />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default PhoneBannerCarousel;
