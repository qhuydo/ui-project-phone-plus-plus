import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { alpha, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import PhoneBanner from "../Card/PhoneBanner";
import "./PhoneCardCarousel.css";
// TODO: refactor me
const PhoneBannerCarousel = () => {
  const theme = useTheme();
  return (
    <Box position="relative">
      <Box
        className="prev-button"
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
        className="next-button"
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
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        navigation={{
          prevEl: ".prev-button",
          nextEl: ".next-button",
        }}
        modules={[Pagination, Navigation, Thumbs]}
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
