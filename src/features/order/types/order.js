import { cartItemType } from "features/cart/types";
import { ORDER_TRACKING_STEPS, ORDER_STEP_STATUS } from "features/order/utils";
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
  cartItems: PropTypes.arrayOf(cartItemType),
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
      status: PropTypes.oneOf(Object.values(ORDER_STEP_STATUS)),
      statusLabel: PropTypes.oneOf(Object.values(ORDER_TRACKING_STEPS)),
      dates: PropTypes.arrayOf(PropTypes.string),
      fromStores: PropTypes.arrayOf(PropTypes.string),
      locations: PropTypes.arrayOf(PropTypes.string),
      activities: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  finishDelivery: PropTypes.bool,
});
