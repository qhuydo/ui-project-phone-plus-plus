import "swiper/css";
import "swiper/css/pagination";
import { alpha, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { PhoneCard } from "features/phones/components/Card";
import { Navigation, Pagination, Thumbs } from "swiper";
import "./PhoneCardCarousel.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// TODO: refactor me
const PhoneCardCarousel = () => {
  const theme = useTheme();
  return (
    <Box position="relative">
      <Box
        className="prev-button"
        style={{
          position: "absolute",
          top: "50%",
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
          top: "50%",
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
        slidesPerView={1}
        spaceBetween={8}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        navigation={{
          prevEl: ".prev-button",
          nextEl: ".next-button",
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
        }}
      >
        <SwiperSlide>
          <PhoneCard />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneCard />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneCard />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneCard />
        </SwiperSlide>
        <SwiperSlide>
          <PhoneCard />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default PhoneCardCarousel;
