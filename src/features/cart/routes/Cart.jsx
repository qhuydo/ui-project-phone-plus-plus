import { Box, Container, Grid, Typography } from "@mui/material";
import { APPBAR_LARGE } from "components/AppBar/AppBar";
import { Head } from "components/Head/Head";
import { CheckoutSection } from "features/cart/components";
import { useScroll } from "hooks";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { CartItemContextProvider } from "features/cart/context";
import { phones } from "features/phones/assets";
import CartItem from "features/cart/components/CartItem/CartItem";

export const Cart = () => {
  const { scrollY } = useScroll();
  return (
    <>
      <Head title={"My cart"} />

      <Container>
        <DefaultBreadcrumb currentPage={"My cart"} />

        <CartItemContextProvider
          cartItem={{
            phone: phones[0],
            colour: phones[0].colours[0],
            version: phones[0].versions[0],
            quantity: 1,
          }}
        >
          <CartItem />
        </CartItemContextProvider>

        <Typography variant={"h4"} textAlign="center" my={1}>
          My cart
        </Typography>

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
