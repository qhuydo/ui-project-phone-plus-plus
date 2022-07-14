import { Container, Typography } from "@mui/material";
import PhoneBannerCarousel from "features/home/components/Banner/PhoneBannerCarousel";
import { Head } from "components/Head/Head";
import ServiceList from "features/home/components/Service/ServiceList";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";
import { PhoneCategoryRow } from "features/phones/components/CategoryRow";
import { NearbyStoreList } from "features/stores/components";
import { phones } from "features/phones/assets";
import { shuffle } from "lodash-es";

export const Home = () => {
  return (
    <>
      <Head />

      <Container spacing={2}>
        <PhoneCategoryRow />

        <PhoneBannerCarousel />

        <Typography variant={"h2"} textAlign="center" sx={{ py: 2 }}>
          Best Promotion
        </Typography>
        <Typography
          variant={"h4"}
          textAlign="center"
          color="primary"
          sx={{ py: 1 }}
        >
          Buy phone to make us rich
        </Typography>
        <PhoneCardCarousel phones={shuffle(phones)} />

        <Typography variant={"h4"} textAlign="center" sx={{ py: 2 }}>
          {"Our Services"}
        </Typography>
        <ServiceList />

        <Typography variant={"h2"} textAlign="center" sx={{ py: 2 }}>
          Latest offer
        </Typography>
        <PhoneCardCarousel phones={shuffle(phones)} />

        <Typography variant={"h4"} textAlign="center" sx={{ py: 2 }}>
          Stores near you
        </Typography>

        <NearbyStoreList sx={{ my: 2 }} />
      </Container>
    </>
  );
};
