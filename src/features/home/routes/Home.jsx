import { Container, Typography } from "@mui/material";
import PhoneBannerCarousel from "features/home/components/Banner/PhoneBannerCarousel";
import { Head } from "components/Head/Head";
import ServiceList from "features/home/components/Service/ServiceList";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";
import { PhoneCategoryRow } from "features/phones/components/CategoryRow";
import { NearbyStoreList } from "features/stores/components";
import { allPhones } from "features/phones/assets";
import { shuffle } from "lodash-es";

export const Home = () => {
  return (
    <>
      <Head />

      <Container spacing={2}>
        <PhoneCategoryRow sx={{ mt: 3, mb: 2 }} />

        <PhoneBannerCarousel />

        <Typography variant={"h2"} textAlign="center" sx={{ pt: 2 }}>
          Best Promotion
        </Typography>
        <Typography
          variant={"h4"}
          textAlign="center"
          color="primary"
          sx={{ pt: "20px", pb: 2 }}
        >
          Buy phone to make us rich
        </Typography>
        <PhoneCardCarousel phones={shuffle(allPhones)} />

        <Typography variant={"h4"} textAlign="center" sx={{ py: 2 }}>
          {"Our Services"}
        </Typography>
        <ServiceList />

        <Typography variant={"h2"} textAlign="center" sx={{ py: 2 }}>
          Latest offer
        </Typography>
        <PhoneCardCarousel phones={shuffle(allPhones)} />

        <Typography variant={"h4"} textAlign="center" sx={{ py: 2 }}>
          Stores near you
        </Typography>

        <NearbyStoreList sx={{ my: 2 }} />
      </Container>
    </>
  );
};
