import React from "react";
import { Routes, Route } from "react-router";
import useScrollRestore from "../hooks/useScrollRestore";
import AllProducts from "../pages/AllProducts";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import ErrorPage from "../pages/ErrorPage";
import CheckOutPage from "../pages/CheckOutPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Verify from "../pages/Verify";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword"
import Profile from "../pages/Profile";

const RouterRoutes = () => {
  useScrollRestore();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default RouterRoutes;
