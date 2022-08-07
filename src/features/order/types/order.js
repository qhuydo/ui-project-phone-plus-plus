import { ORDER_TRACKING_STEPS } from "features/order/utils";
import { PAYMENT_METHODS, DELIVERY_METHODS } from "features/payment/utils";
import PropTypes from "prop-types";

export const contactDetailsType = PropTypes.shape({
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
  deliveryMethod: PropTypes.oneOf(DELIVERY_METHODS),
});

export const orderType = PropTypes.shape({
  id: PropTypes.string,
  timestamp: PropTypes.number,
  cartItems: PropTypes.array,
  contactDetails: contactDetailsType,
  paymentMethod: PropTypes.shape({
    method: PropTypes.oneOf(Object.values(PAYMENT_METHODS)),
    creditOrDebitCard: PropTypes.shape({
      nameOnCard: PropTypes.string,
      cardNumber: PropTypes.string,
      mmyy: PropTypes.string,
      cvcCvv: PropTypes.string,
    }),
  }),
  status: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(["loading", "pending", "done"]),
      statusLabel: PropTypes.oneOf(ORDER_TRACKING_STEPS),
      date: PropTypes.string,
      fromStore: PropTypes.string,
      location: PropTypes.string,
      activity: PropTypes.string,
    })
  ),
});
