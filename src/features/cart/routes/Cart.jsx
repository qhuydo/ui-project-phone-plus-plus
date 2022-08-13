import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { APPBAR_LARGE } from "components/AppBar/AppBar";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Head } from "components/Head/Head";
import { CheckoutSection } from "features/cart/components";
import CartInfoSection from "features/cart/components/CartInfoSection/CartInfoSection";
import CartItemList from "features/cart/components/CartInfoSection/CartItemList";
import VoucherSection from "features/cart/components/CartInfoSection/VoucherSection";
import { useCartContext } from "features/cart/context/CartContext";
import { SupportPaymentTypes } from "features/payment/components";
import EmptyCartBanner from "../components/CartInfoSection/EmptyCartBanner";
import PeopleAlsoBuySection from "../components/CartInfoSection/PeopleAlsoBuySection";
import SpecialOfferSection from "../components/CartInfoSection/SpecialOfferSection";

export const Cart = () => {
  const { state } = useCartContext();

  return (
    <>
      <Head title={"My cart"} />

      <Container>
        <DefaultBreadcrumb currentPage={"My cart"} />

        {state.cartItems.length !== 0 && (
          <Typography variant={"h3"} textAlign="center" my={1}>
            My cart
          </Typography>
        )}

        {state.cartItems.length === 0 && (
          <Stack direction="column" spacing={1} width={1} alignItems="center">
            <Stack
              direction="column"
              spacing={0.25}
              width={1}
              pb={2}
              alignItems="center"
            >
              <EmptyCartBanner />
            </Stack>

            <Divider sx={{ width: 1 }} />

            <PeopleAlsoBuySection
              maxItems={8}
              phonesPerView={{
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5,
              }}
            />
          </Stack>
        )}

        {state.cartItems.length !== 0 && (
          <Grid container alignItems="start">
            <Grid
              item
              xs={12}
              padding={1}
              sx={(theme) => ({
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              })}
            >
              <Stack direction="column" spacing={1} alignItems="center">
                <CartItemList
                  items={state.cartItems}
                  pushSaleMap={state.pushSaleMap}
                />
                <SupportPaymentTypes />
                <VoucherSection />
                <CheckoutSection />
                <SpecialOfferSection />
                <PeopleAlsoBuySection />
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              md={7}
              lg={8}
              padding={1}
              sx={(theme) => ({
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              })}
            >
              <CartInfoSection />
            </Grid>

            <Grid
              item
              xs={12}
              md={5}
              lg={4}
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
                  borderWidth: "2.25px",
                }}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};
