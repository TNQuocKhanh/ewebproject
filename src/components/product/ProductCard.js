import React, { useContext } from "react";
import { Link } from "react-router-dom";
import cartContext from "../../contexts/cart/cartContext";
import Toastify from "./Toastify";
import useActive from "../../hooks/useActive";
import { formatPrice } from "../../utils/format";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chip } from "@mui/material";

const ProductCard = (props) => {
  const {
    id,
    name,
    discountPrice,
    price,
    discountPercent,
    mainImage,
    quantity,
  } = props;

  const { addItem, cart } = useContext(cartContext);
  const { active, handleActive, activeClass } = useActive(false);

  const handleAddItem = () => {
    const item = { ...props };
    const find = cart.find((it) => it.id === item.id);
    if (find) {
      if (find.amount > item.quantity) {
        toast.info("Đã thêm tối đa số lượng sản phẩm");
      } else {
        addItem(item);
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } else {
      addItem(item);
      toast.success("Thêm vào giỏ hàng thành công");
    }
    handleActive(id);

    setTimeout(() => {
      handleActive(false);
    }, 3000);
  };

  const newPrice = formatPrice(discountPrice);
  const oldPrice = formatPrice(price);

  return (
    <>
      <div className="card products_card">
        <Toastify />
        <figure className="products_img">
          <Link to={`/product-details/${id}`}>
            <img
              src={mainImage}
              alt="product-img"
              style={{ height: "160px", objectFit: "contain" }}
            />
          </Link>
        </figure>
        <div className="products_details">
          <h3 className="products_title" style={{ height: "60px" }}>
            <Link to={`/product-details/${id}`}>{name}</Link>
          </h3>
          {<div className="separator"></div>}
          <h2 className="products_price">
            <p style={{ marginBottom: "5px" }}>{newPrice}</p>
            <small style={{ fontWeight: "500" }}>
              <del>{oldPrice}</del> <small> -{discountPercent}%</small>
            </small>
            &nbsp;&nbsp;
            {quantity >= 1 && (
              <Chip label="Còn hàng" style={{ fontSize: "10px" }} />
            )}
          </h2>
          <button
            type="button"
            className={`btn products_btn ${activeClass(id)}`}
            onClick={handleAddItem}
          >
            {active ? "Đã thêm" : "Thêm vào giỏ"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
