import React from "react";
import "../../styles/partials/components/_toast_add_product.scss";
import { ToastContainer } from "react-toastify";

const ToastAddProduct = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastAddProduct;
