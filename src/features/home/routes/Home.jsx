import { Container, Typography } from "@mui/material";
import PhoneBannerCarousel from "components/Banner/PhoneBannerCarousel";
import { Head } from "components/Head/Head";
import ServiceList from "components/Service/ServiceList";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";
import { PhoneCategoryRow } from "features/phones/components/CategoryRow";

export const Home = () => {
  return (
    <>
      <Head />

      <Container>
        <PhoneCategoryRow sx={{ my: 2 }} />

        <PhoneBannerCarousel />
        <Typography variant={"h4"} my={2} textAlign="center">
          {"Our Services"}
        </Typography>

        <ServiceList />

        <Typography variant={"h4"} my={2} textAlign="center">
          {"<<Đề xuất | Top nổi bật | Danh sách điện thoại>>"}
        </Typography>

        {/*<Grid*/}
        {/*  container*/}
        {/*  display="flex"*/}
        {/*  alignItems="center"*/}
        {/*  justifyContent="center"*/}
        {/*  columnSpacing={1}*/}
        {/*  pb={2}*/}
        {/*>*/}
        {/*  <Grid item sm={6} md={4} lg={3}>*/}
        {/*    <PhoneCard />*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
        <PhoneCardCarousel />
      </Container>
    </>
  );
};
