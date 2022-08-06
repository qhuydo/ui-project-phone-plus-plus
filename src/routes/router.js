const router = {
  HOME: "/",
  CART: "/cart",
  LOGIN: "/login",
  ORDERS: "order",
  PAYMENT: "/payment",
  PHONE_COMPARISON: "/phone/compare",
  PHONE_SEARCH_RESULT: "/phone/search",
  PHONE_CATEGORY: "/phone/category/:brand",
  PHONE_DETAILS: "/phone/:id",
  REFUND: "/refund",
  REGISTER: "/register",
  TRACK_MY_ORDER: "/order/track",
  getOrderTrackingPage(id) {
    return `/order/track?id=${id}`;
  },
  getPhoneDetailsPage(id, name) {
    return `/phone/${id}?q=${name}`;
  },
  getCategoryPage(brand) {
    return `/phone/category/${brand}`;
  },
  getPhoneComparePage(ids) {
    const link = "/phone/compare";
    if (!ids) {
      return link;
    }
    return ids.reduce(
      (query, id, idx) => `${query}${idx === 0 ? "?" : "&"}id${idx + 1}=${id}`,
      link
    );
  },
};

export default router;
