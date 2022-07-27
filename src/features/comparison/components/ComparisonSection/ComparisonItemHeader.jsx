import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { useCartContext } from "features/cart/context/CartContext";
import { createCartItem } from "features/cart/utils";
import { usePhoneComparisonContext } from "features/comparison/context";
import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Router } from "routes";
import { GOLDEN_RATIO } from "utils/constants";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const ComparisonItemHeader = ({ phone, width }) => {
  const { addItem } = useCartContext();

  const { removePhone } = usePhoneComparisonContext();

  const linkToPhoneDetails = useMemo(() => {
    return Router.getPhoneDetailsPage(phone.id, phone.name);
  }, [phone?.id, phone?.name]);

  const onCartItemAdded = useCallback(
    (e) => {
      e.preventDefault();
      return addItem(createCartItem(phone));
    },
    [addItem, phone]
  );

  const onItemRemoved = useCallback(() => {
    removePhone(phone.id);
  }, [phone.id, removePhone]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={1}
      width={width}
      position="relative"
    >
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
        onClick={onItemRemoved}
      >
        <CancelOutlinedIcon />
      </IconButton>
      <Box
        component="img"
        src={phone.thumbnail}
        sx={{
          aspectRatio: `${GOLDEN_RATIO}`,
          width: 161.8,
          objectFit: "cover",
          border: "1px solid",
          borderRadius: "8px",
          borderColor: "divider",
        }}
      />

      <Link
        component={RouterLink}
        underline="none"
        color="inherit"
        to={linkToPhoneDetails}
      >
        <Typography variant="body2" fontWeight="bold">
          {phone.name}
        </Typography>
      </Link>

      <Stack direction="row" spacing={1} minHeight={22}>
        <Typography variant="body2" fontWeight="bold">
          {phone.versions[0].displaySalePrice}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textDecoration: "line-through",
          }}
          fontWeight="bold"
        >
          {phone.versions[0].displayOriginalPrice}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} width={1}>
        <Button
          variant="contained"
          startIcon={<PaymentOutlinedIcon />}
          fullWidth
        >
          Buy now
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt: 1,
            "&.MuiButton-outlinedPrimary": {
              border: "1px solid",
              borderColor: "divider",
            },
          }}
          startIcon={<AddShoppingCartOutlinedIcon />}
          onClick={onCartItemAdded}
        >
          Add to cart
        </Button>
      </Stack>
      <Divider flexItem sx={{ pt: 2 }} />
    </Stack>
  );
};

ComparisonItemHeader.propTypes = {
  phone: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ComparisonItemHeader;
