import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../../styles/partials/components/_toast_add_product.scss";

const ToastAddProduct = () => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: "10000",
        top: "150px",
        right: "20px",
        color: "white",
      }}
      className="toast-add-product"
    >
      <div
        style={{
          padding: "13px 20px",
          background: "#49a255",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FaCheckCircle style={{ marginRight: "10px", fontSize: "25px" }} /> Đã
        thêm vào giỏ hàng
      </div>
    </div>
  );
};

export default ToastAddProduct;
