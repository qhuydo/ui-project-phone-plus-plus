const router = {
  HOME: "/",
  CART: "/cart",
  LOGIN: "/login",
  PAYMENT: "/payment",
  PHONE_COMPARISON: "/phone/compare",
  PHONE_SEARCH_RESULT: "/phone/search",
  PHONE_DETAILS: "/phone/:id",
  REGISTER: "/register",
  getPhoneDetailsPage(id, name) {
    return `/phone/${id}?q=${name}`;
  },
};

export default router;
