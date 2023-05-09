import React from "react";
import "../../styles/partials/components/_toast_add_product.scss";
import { ToastContainer } from "react-toastify";

const Toastify = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1000}
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

export default Toastify;
