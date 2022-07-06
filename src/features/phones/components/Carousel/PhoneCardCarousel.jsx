import "swiper/css";
import "swiper/css/pagination";
import { alpha, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { PhoneCard, PhoneCardSkeleton } from "features/phones/components/Card";
import { Navigation, Pagination, Thumbs } from "swiper";
import "./PhoneCardCarousel.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";

// TODO: refactor me
const N_CARDS = 5;

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
          [theme.breakpoints.values["xl"]]: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
        }}
      >
        {[...Array(N_CARDS).keys()].map((key) => (
          <SwiperSlide key={key}>
            {isLoading ? <PhoneCardSkeleton /> : <PhoneCard />}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PhoneCardCarousel;
