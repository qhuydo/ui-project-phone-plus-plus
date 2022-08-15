import PropTypes from "prop-types";

export const pushSaleType = PropTypes.shape({
  phoneId: PropTypes.string,
  description: PropTypes.string,
  versions: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      pushSalePrice: PropTypes.number,
      displayPushSalePrice: PropTypes.string,
    })
  ),
});

export const cartItemType = PropTypes.shape({
  colour: PropTypes.shape({
    colour: PropTypes.string,
    colourName: PropTypes.string,
    thumbnail: PropTypes.string,
  }),
  phone: PropTypes.object,
  quantity: PropTypes.number,
  version: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    originalPrice: PropTypes.number,
    displayOriginalPrice: PropTypes.string,
    salePrice: PropTypes.number,
    displaySalePrice: PropTypes.string,
  }),
  pushSale: pushSaleType,
});
