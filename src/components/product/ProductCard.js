import React, { useContext } from "react";
import { Link } from "react-router-dom";
import cartContext from "../../contexts/cart/cartContext";
import Toastify from "./Toastify";
import useActive from "../../hooks/useActive";
import { formatPrice } from "../../utils/format";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = (props) => {
  const { id, name, discountPrice, price, discountPercent, mainImage } = props;

  const { addItem } = useContext(cartContext);
  const { active, handleActive, activeClass } = useActive(false);

  const handleAddItem = () => {
    const item = { ...props };
    addItem(item);
    handleActive(id);

    toast.success("Thêm vào giỏ hàng thành công");
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
            <img src={mainImage} alt="product-img" />
          </Link>
        </figure>
        <div className="products_details">
          <h3 className="products_title">
            <Link to={`/product-details/${id}`}>{name}</Link>
          </h3>
          {<div className="separator"></div>}
          <h2 className="products_price">
            <p style={{ marginBottom: "5px" }}>{newPrice}</p>
            <small style={{ fontWeight: "500" }}>
              <del>{oldPrice}</del> <small> -{discountPercent}%</small>
            </small>
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
