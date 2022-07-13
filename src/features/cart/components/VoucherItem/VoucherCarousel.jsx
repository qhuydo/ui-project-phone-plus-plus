import PropTypes from "prop-types";
import { Box, Stack } from "@mui/material";
import VoucherItem from "features/cart/components/VoucherItem/VoucherItem";

// const PREV_BUTTON_ID = "voucher-carousel-prev-button";
// const NEXT_BUTTON_ID = "voucher-carousel-next-button";

const VoucherCarousel = ({ vouchers }) => {
  // const theme = useTheme();
  return (
    <Box
      position="relative"
      width={0.9}
      alignItems="center"
      justifyContent="center"
    >
      {/*<CarouselButton id={PREV_BUTTON_ID} />*/}

      {/*<CarouselButton id={NEXT_BUTTON_ID} type="next" />*/}

      {/*<Swiper*/}
      {/*  className="voucher-swiper"*/}
      {/*  slidesPerView={4}*/}
      {/*  spaceBetween={8}*/}
      {/*  navigation={{*/}
      {/*    prevEl: `#${PREV_BUTTON_ID}`,*/}
      {/*    nextEl: `#${NEXT_BUTTON_ID}`,*/}
      {/*    disabledClass: "Mui-disabled",*/}
      {/*  }}*/}
      {/*  modules={[Navigation, Thumbs]}*/}
      {/*  breakpoints={{*/}
      {/*    [theme.breakpoints.values["sm"]]: {*/}
      {/*      slidesPerView: vouchersPerView.sm,*/}
      {/*      spaceBetween: 4,*/}
      {/*    },*/}
      {/*    [theme.breakpoints.values["md"]]: {*/}
      {/*      slidesPerView: vouchersPerView.md,*/}
      {/*      spaceBetween: 8,*/}
      {/*    },*/}
      {/*    [theme.breakpoints.values["lg"]]: {*/}
      {/*      slidesPerView: vouchersPerView.lg,*/}
      {/*      spaceBetween: 12,*/}
      {/*    },*/}
      {/*    [theme.breakpoints.values["xl"]]: {*/}
      {/*      slidesPerView: vouchersPerView.xl,*/}
      {/*      spaceBetween: 12,*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {vouchers.map((voucher, idx) => (*/}
      {/*    <SwiperSlide key={idx} className="voucher-swiper-slide">*/}
      {/*      <Box display="block">*/}

      {/*      <VoucherItem voucherItem={voucher}  />*/}
      {/*      </Box>*/}
      {/*    </SwiperSlide>*/}
      {/*  ))}*/}
      {/*</Swiper>*/}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        width={1}
      >
        {vouchers.map((voucher, idx) => (
          <VoucherItem voucherItem={voucher} key={idx} />
        ))}
      </Stack>
    </Box>
  );
};

VoucherCarousel.defaultProps = {
  vouchersPerView: {
    xs: 4,
    sm: 4,
    md: 4,
    lg: 4,
    xl: 4,
  },
};

VoucherCarousel.propTypes = {
  vouchers: PropTypes.array,
  vouchersPerView: PropTypes.object,
};

export default VoucherCarousel;
