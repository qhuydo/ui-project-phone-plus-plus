import { Container, Grid, Typography } from "@mui/material";
import { PhoneCard } from "features/phones/components/Card";

export const Home = () => {
  return (
    <Container>
      <Typography variant={"h4"} my={2} textAlign="center">
        {"<<Đề xuất | Top nổi bật | Danh sách điện thoại>>"}
      </Typography>

      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
        columnSpacing={1}
        pb={2}
      >
        <Grid item sm={6} md={4} lg={3}>
          <PhoneCard />
        </Grid>
      </Grid>
    </Container>
  );
};
