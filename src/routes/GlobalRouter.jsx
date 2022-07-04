import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ROUTER from "./router";
import { Home } from "features/home";
import { Cart } from "features/cart";
import { PhoneDetails, PhoneComparison } from "features/phones";
import MainLayout from "components/Layout/MainLayout";

const GlobalRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER.HOME} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTER.CART} element={<Cart />} />
          <Route path={ROUTER.PHONE_DETAILS} element={<PhoneDetails />} />
          <Route path={ROUTER.PHONE_COMPARISON} element={<PhoneComparison />} />
          <Route path={"*"} element={<Navigate to={"."} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default GlobalRouter;
