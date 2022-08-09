import EditIcon from "@mui/icons-material/Edit";
import { Stack, Typography, Box, Button } from "@mui/material";
import { getEstimatedDeliveryDate } from "features/order/utils";
import { countries } from "features/payment/assets";
import { contactDetailsType } from "features/order/types";
import {
  getAddressFromDeliveryDetails,
  DELIVERY_METHOD_TEXTS,
} from "features/payment/utils";
import PropTypes from "prop-types";
import { useMemo } from "react";

export const TextRow = ({ width, title, content }) => (
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

const DeliveryInfo = ({
  contactDetails,
  showEditButton,
  onEditButtonClicked,
  timestamp,
  ...others
}) => {
  const { customerDetails, deliveryDetails, billingDetails, deliveryMethod } =
    contactDetails;

  const deliveryDetailsAddress = useMemo(
    () => getAddressFromDeliveryDetails(deliveryDetails),
    [deliveryDetails]
  );

  const billingDetailsAddress = useMemo(
    () => getAddressFromDeliveryDetails(billingDetails),
    [billingDetails]
  );

  const estimatedDeliveryDate = useMemo(
    () => getEstimatedDeliveryDate(deliveryMethod, timestamp),
    [deliveryMethod, timestamp]
  );

  return (
    <Stack direction="column" spacing={1} p={1} {...others}>
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

      <TextRow title={"Delivery Address"} content={deliveryDetailsAddress} />

      {billingDetails.sameAsDeliveryAddress ? (
        <Typography color="text.secondary" fontStyle="italic">
          Billing address is the same as delivery address
        </Typography>
      ) : (
        <TextRow title={"Billing address"} content={billingDetailsAddress} />
      )}

      <Stack direction="row">
        <TextRow
          width={0.5}
          title={"Delivery method"}
          content={DELIVERY_METHOD_TEXTS[deliveryMethod]}
        />
        <TextRow
          width={0.5}
          title={"Estimated delivery date"}
          content={estimatedDeliveryDate}
        />
      </Stack>

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
            onClick={onEditButtonClicked}
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
  contactDetails: contactDetailsType.isRequired,
  showEditButton: PropTypes.bool,
  onEditButtonClicked: PropTypes.func,
  timestamp: PropTypes.number,
};

export default DeliveryInfo;
