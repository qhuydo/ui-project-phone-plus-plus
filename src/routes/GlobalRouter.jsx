import MainLayout from "components/Layout/MainLayout";
import { Cart } from "features/cart";
import { Home } from "features/home";
import { Payment } from "features/payment";
import { PhoneDetails, PhoneSearchResult } from "features/phones";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ROUTER from "./router";
import ScrollToTop from "components/Layout/ScrollToTop";
import { PhoneComparison } from "features/comparison";

const GlobalRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTER.HOME} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTER.CART} element={<Cart />} />
          <Route path={ROUTER.PHONE_COMPARISON} element={<PhoneComparison />} />
          <Route
            path={ROUTER.PHONE_CATEGORY}
            element={<PhoneSearchResult categoryPage />}
          />
          <Route
            path={ROUTER.PHONE_SEARCH_RESULT}
            element={<PhoneSearchResult />}
          />
          <Route path={ROUTER.PHONE_DETAILS} element={<PhoneDetails />} />
          <Route path={ROUTER.PAYMENT} element={<Payment />} />
          <Route path={"*"} element={<Navigate to={"."} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default GlobalRouter;
