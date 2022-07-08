import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import { categories } from "features/phones/assets";
import CarouselButton from "components/Button/CarouselButton";

import "./PhoneCategoryRow.css";
import PhoneCategoryItem from "features/phones/components/CategoryRow/PhoneCategoryItem";
import PropTypes from "prop-types";

const PREV_BUTTON_ID = "phone-category-prev-button";
const NEXT_BUTTON_ID = "phone-category-next-button";

const PhoneCategoryRow = ({ sx }) => {
  return (
    <Box position="relative" height="60px" sx={sx}>
      <CarouselButton id={PREV_BUTTON_ID} variant="outlined" />
      <CarouselButton id={NEXT_BUTTON_ID} type="next" variant="outlined" />

      <Swiper
        freeMode
        centerInsufficientSlides
        slidesPerView={"auto"}
        spaceBetween={40}
        navigation={{
          prevEl: `#${PREV_BUTTON_ID}`,
          nextEl: `#${NEXT_BUTTON_ID}`,
          disabledClass: "Mui-disabled",
        }}
        modules={[Navigation]}
        className="category-swiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.key} style={{ width: "auto" }}>
            <PhoneCategoryItem category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

PhoneCategoryRow.propTypes = {
  sx: PropTypes.any,
};

export default PhoneCategoryRow;
