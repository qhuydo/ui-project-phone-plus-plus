import PropTypes from "prop-types";

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
    displayOrigingalPrice: PropTypes.string,
    salePrice: PropTypes.number,
    displaySalePrice: PropTypes.string,
  }),
  pushSale: PropTypes.shape({
    phoneId: PropTypes.string,
    description: PropTypes.string,
    versions: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.string,
          pushSalePrice: PropTypes.number,
          displayPushSalePrice: PropTypes.string,
        })
      )
    ),
  }),
});
