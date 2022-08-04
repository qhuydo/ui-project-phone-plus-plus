import { PAYMENT_METHODS } from "features/payment/utils";
import PropTypes from "prop-types";

export const orderType = PropTypes.shape({
  id: PropTypes.string,
  timestamp: PropTypes.number,
  cartItems: PropTypes.array,
  contactDetails: PropTypes.shape({
    customerDetails: PropTypes.shape({
      fullName: PropTypes.string,
      phoneIsoCode: PropTypes.string,
      phoneNumber: PropTypes.string,
      email: PropTypes.string,
    }),
    deliveryDetails: PropTypes.shape({
      provinceId: PropTypes.string,
      districtId: PropTypes.string,
      communeId: PropTypes.string,
      street: PropTypes.string,
      customerNotes: PropTypes.string,
    }),
    billingDetails: PropTypes.shape({
      sameAsDeliveryAddress: PropTypes.bool,
      provinceId: PropTypes.string,
      districtId: PropTypes.string,
      communeId: PropTypes.string,
      street: PropTypes.string,
    }),
    deliveryMethod: PropTypes.oneOf(["standard", "fast"]),
  }),
  paymentMethod: PropTypes.shape({
    method: PropTypes.oneOf(Object.values(PAYMENT_METHODS)),
    creditOrDebitCard: PropTypes.shape({
      nameOnCard: PropTypes.string,
      cardNumber: PropTypes.string,
      mmyy: PropTypes.string,
      cvcCvv: PropTypes.string,
    }),
  }),
});
