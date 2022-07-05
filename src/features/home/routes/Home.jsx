import { Container, Typography } from "@mui/material";
import PhoneBannerCarousel from "features/phones/components/Carousel/PhoneBannerCarousel";
import PhoneCardCarousel from "features/phones/components/Carousel/PhoneCardCarousel";

export const Home = () => {
  return (
    <Container>
      <PhoneBannerCarousel />
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
  );
};
