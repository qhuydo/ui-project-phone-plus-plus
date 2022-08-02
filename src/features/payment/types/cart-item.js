import PropTypes from "prop-types";

export const cartItemType = PropTypes.shape({
  colour: PropTypes.object,
  phone: PropTypes.object,
  quantity: PropTypes.number,
  version: PropTypes.object,
});
