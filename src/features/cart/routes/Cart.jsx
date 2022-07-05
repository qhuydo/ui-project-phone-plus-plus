import { Head } from "components/Head/Head";
import { Box, Container, Grid } from "@mui/material";
import { APPBAR_LARGE } from "components/AppBar/AppBar";
import CheckoutSection from "features/cart/components/CheckoutSection";
import { useScroll } from "hooks";

export const Cart = () => {
  const { scrollY } = useScroll();
  return (
    <>
      <Head title={"My shopping cart"} />

      <Container>
        <Grid container alignItems="start">
          {/*<Grid*/}
          {/*  item*/}
          {/*  xs={12}*/}
          {/*  padding={1}*/}
          {/*  sx={(theme) => ({*/}
          {/*    [theme.breakpoints.up("sm")]: {*/}
          {/*      display: "none",*/}
          {/*    },*/}
          {/*  })}*/}
          {/*>*/}
          {/*  <Box height="120px" bgcolor="primary.dark" />*/}
          {/*</Grid>*/}

          <Grid item xs={12} md={7} lg={7.75} padding={1}>
            <Box height="1000px" bgcolor="primary.light" />
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            lg={4.25}
            padding={1}
            position="sticky"
            alignSelf="flex-start"
            top={`${APPBAR_LARGE}px`}
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            })}
          >
            <CheckoutSection
              cardSx={{
                boxShadow: scrollY === 0 ? 0 : 3,
                borderColor: scrollY === 0 ? null : "primary.main",
                borderWidth: "2.25px",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
