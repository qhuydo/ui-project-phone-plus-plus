import EditIcon from "@mui/icons-material/Edit";
import { Stack, Typography, Box, Button } from "@mui/material";
import { countries } from "features/payment/assets";
import { usePaymentContext } from "features/payment/context";
import {
  getAddressFromDeliveryDetails,
  DELIVERY_METHOD_TEXTS,
} from "features/payment/utils";
import PropTypes from "prop-types";
import { useCallback } from "react";

const TextRow = ({ width, title, content }) => (
  <Stack width={width ?? 1} spacing={0} direction="column">
    <Typography variant="h6">{title}</Typography>
    <Typography>{content}</Typography>
  </Stack>
);

TextRow.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  content: PropTypes.string,
};

const DeliveryInfo = ({ showEditButton }) => {
  const {
    state: { contactDetails },
    dispatch,
  } = usePaymentContext();
  const { customerDetails, deliveryDetails, billingDetails, deliveryMethod } =
    contactDetails;

  const onEditPageButtonClicked = useCallback(async () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 0 });
  }, [dispatch]);

  return (
    <Stack direction="column" spacing={1} p={1}>
      <TextRow title={"Full name"} content={customerDetails.fullName} />
      <Stack direction="row">
        <TextRow
          width={0.5}
          title={"Phone number"}
          content={`(${
            countries[customerDetails.phoneIsoCode]?.dialCode ?? "+84"
          }) ${customerDetails.phoneNumber}`}
        />
        <TextRow width={0.5} title={"Email"} content={customerDetails.email} />
      </Stack>
      <TextRow
        title={"Delivery Address"}
        content={getAddressFromDeliveryDetails(deliveryDetails)}
      />
      {billingDetails.sameAsDeliveryAddress ? (
        <Typography color="text.secondary" fontStyle="italic">
          Billing address is the same as delivery address
        </Typography>
      ) : (
        <TextRow
          title={"Billing address"}
          content={getAddressFromDeliveryDetails(billingDetails)}
        />
      )}

      <TextRow
        title={"Delivery method"}
        content={DELIVERY_METHOD_TEXTS[deliveryMethod]}
      />

      {showEditButton && (
        <Box
          width={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={onEditPageButtonClicked}
            sx={{ minWidth: 200 }}
          >
            Edit
          </Button>
        </Box>
      )}
    </Stack>
  );
};

DeliveryInfo.propTypes = {
  showEditButton: PropTypes.bool,
};

export default DeliveryInfo;
