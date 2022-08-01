import { Grid } from "@mui/material";
import { APPBAR_LARGE } from "components/AppBar/AppBar";
import PropTypes from "prop-types";

export const PaymentContainerGrid = ({ children, ...props }) => (
  <Grid container alignItems="start" {...props}>
    {children}
  </Grid>
);

PaymentContainerGrid.propTypes = {
  children: PropTypes.element,
};

export const InfoGrid = ({ children, ...props }) => (
  <Grid item xs={12} md={7} lg={8} padding={1} {...props}>
    {children}
  </Grid>
);

InfoGrid.propTypes = {
  children: PropTypes.element,
};

export const CheckoutSectionGrid = ({ children, ...props }) => (
  <Grid
    item
    xs={12}
    md={5}
    lg={4}
    padding={1}
    position="sticky"
    alignSelf="flex-start"
    top={`${APPBAR_LARGE}px`}
    {...props}
  >
    {children}
  </Grid>
);

CheckoutSectionGrid.propTypes = {
  children: PropTypes.element,
};
