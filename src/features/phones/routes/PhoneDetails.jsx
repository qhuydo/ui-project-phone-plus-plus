import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  PhoneCardContextProvider,
  PhoneDetailsContextProvider,
  usePhoneDetailsContext,
} from "features/phones/context";
import { Head } from "components/Head/Head";
import {
  Collapse,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { PhoneDetailsFirstSection } from "features/phones/components/PhoneDetailHeader";
import NotFound from "features/misc/routes/NotFound";
import PhoneSpecificationSection from "features/phones/components/PhoneSpecificationSection/PhoneSpecificationSection";
import { PhoneCommentSection } from "features/phones/components/PhoneCommentSection";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";
import { SwiperSlide } from "swiper/react";
import { PhoneCard } from "features/phones/components/Card";
import { NearbyStoreList } from "features/stores/components";
import Router from "routes/router";

export const PhoneDetails = () => {
  const { id } = useParams();
  return (
    <PhoneDetailsContextProvider phoneId={id}>
      <PhoneDetailsBody />
    </PhoneDetailsContextProvider>
  );
};

const PhoneDetailsBody = () => {
  const {
    state: { phoneDetails, isLoading, recommendedPhones },
  } = usePhoneDetailsContext();

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));

  const renderRecommendedPhones = useCallback(
    () =>
      recommendedPhones.map(({ phone, pushSale }) => (
        <SwiperSlide key={phone.id} className="phone-swiper-slide">
          <PhoneCardContextProvider phone={phone} pushSale={pushSale}>
            <PhoneCard />
          </PhoneCardContextProvider>
        </SwiperSlide>
      )),
    [recommendedPhones]
  );

  if (isLoading) return null;
  if (!phoneDetails && !isLoading) return <NotFound />;

  // console.log(recommendedPhones);
  return (
    <>
      <Head title={`${phoneDetails ? phoneDetails.name : "Details"}`} />

      <Container display="block">
        <DefaultBreadcrumb
          currentPage={`${phoneDetails.name}`}
          links={[
            {
              to: Router.getCategoryPage(phoneDetails.category),
              page: phoneDetails.categoryName ?? "Brand",
            },
          ]}
        />

        <PhoneDetailsFirstSection />

        <Collapse in={recommendedPhones.length !== 0}>
          <Stack direction="column" spacing={2} pb={2}>
            <Typography variant={smScreen ? "h4" : "h3"} textAlign="center">
              People also buy
            </Typography>

            <PhoneCardCarousel
              phones={[]}
              renderPhoneCb={renderRecommendedPhones}
              id="recommended-phones-carousel"
            />
          </Stack>
        </Collapse>

        <PhoneSpecificationSection />

        <PhoneCommentSection />

        <Typography
          variant={smScreen ? "h4" : "h3"}
          textAlign="center"
          sx={{ py: 2 }}
        >
          Stores you can buy {phoneDetails.name}
        </Typography>

        <NearbyStoreList sx={{ my: 2 }} />
      </Container>
    </>
  );
};
