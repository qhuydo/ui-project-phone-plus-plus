import { Stack, Typography, Container, SvgIcon, Divider } from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { CartIcon } from "features/cart/assets";
import PeopleAlsoBuySection from "features/cart/components/CartInfoSection/PeopleAlsoBuySection";

const iconStyle = (theme) => ({
  width: "20%",
  height: "20%",
  ".start-color": {
    "--color-start": theme.palette.primary.main,
  },
  ".end-color": {
    "--color-stop": theme.palette.secondary.main,
  },
});

const EmptyCart = () => {
  return (
    <Container sx={{ mb: 3 }}>
      <DefaultBreadcrumb currentPage={"Checkout"} />

      <Stack direction="column" spacing={1} width={1} alignItems="center">
        <Stack
          direction="column"
          spacing={0.25}
          width={1}
          pb={2}
          alignItems="center"
        >
          <SvgIcon
            component={CartIcon}
            sx={iconStyle}
            className="svg-gradient-wrapper"
            inheritViewBox
          />
          <Typography variant="h4" textAlign="center" color="secondary.main">
            Your cart is empty
          </Typography>
          <Typography variant="h6">
            Please add items to your cart before making a purchase
          </Typography>
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
    </Container>
  );
};

export default EmptyCart;
