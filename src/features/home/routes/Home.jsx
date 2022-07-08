import { Container, Typography } from "@mui/material";
import PhoneBannerCarousel from "components/Banner/PhoneBannerCarousel";
import { Head } from "components/Head/Head";
import ServiceList from "features/home/components/Service/ServiceList";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";
import { PhoneCategoryRow } from "features/phones/components/CategoryRow";
import { NearbyStoreList } from "features/stores/components";

export const Home = () => {
  return (
    <>
      <Head />

      <Container spacing={2}>
        <PhoneCategoryRow />

        <PhoneBannerCarousel />

        <Typography variant={"h4"} textAlign="center">
          {"Our Services"}
        </Typography>
        <ServiceList />

        <Typography variant={"h4"} textAlign="center">
          Latest offer
        </Typography>
        <PhoneCardCarousel />

        <Typography variant={"h4"} textAlign="center">
          Stores near you
        </Typography>

        <NearbyStoreList sx={{ my: 2 }} />
      </Container>
    </>
  );
};
