import { Typography, Stack, Paper } from "@mui/material";
import { cartItemType } from "features/payment/types";
import PropTypes from "prop-types";
import React from "react";
import { GOLDEN_RATIO } from "utils/constants";
import formatNumberToVND from "utils/currency-formatter";

const CartItemList = ({ cartItems, ...others }) => {
  return (
    <>
      {cartItems?.map((item, idx) => (
        <Stack direction="row" spacing={1} p={1} key={idx} {...others}>
          <Paper
            variant="outlined"
            component="img"
            src={item.colour.thumbnail}
            sx={(theme) => ({
              width: 145,
              aspectRatio: `${GOLDEN_RATIO}`,
              borderRadius: `${theme.shape.borderRadius}px`,
            })}
          />

          <Stack direction="column" flexGrow={1}>
            <Stack direction="row" width={1} justifyContent="space-between">
              <Typography variant="h6">{item.phone.name}</Typography>
              <Typography variant="h6">
                {formatNumberToVND(item.version.salePrice * item.quantity)}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              width={1}
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Typography variant="subtitle1" color="text.secondary">
                {`${item.version.name}, ${item.colour.colourName}`}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary">
                {`${item.version.displaySalePrice} per item`}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              width={1}
              justifyContent="end"
              alignItems="center"
              spacing={1}
            >
              <Typography variant="subtitle1" color="text.secondary">
                {`Quantity: ${item.quantity}`}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  );
};

CartItemList.propTypes = {
  cartItems: PropTypes.arrayOf(cartItemType),
};

export default CartItemList;
