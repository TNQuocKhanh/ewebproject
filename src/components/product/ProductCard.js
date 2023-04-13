import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import cartContext from "../../contexts/cart/cartContext";
import ToastAddProduct from "./ToastAddProduct";
import useActive from "../../hooks/useActive";

const ProductCard = (props) => {
  const { id, name, discountPrice, price, discountPercent, mainImage } = props;

  const { addItem, cart } = useContext(cartContext);
  const { active, handleActive, activeClass } = useActive(false);
  const [openToast, setOpenToast] = useState(false);

  const handleAddItem = () => {
    const item = { ...props };
    addItem(item);

    handleActive(id);

    toastAdd();

    setTimeout(() => {
      handleActive(false);
      setOpenToast(false);
    }, 3000);
  };

  const toastAdd = () => {
    setOpenToast(true);
  };

  const newPrice = displayMoney(discountPrice);
  const oldPrice = displayMoney(price);

  return (
    <>
      {openToast === true && <ToastAddProduct />}
      <div className="card products_card">
        <figure className="products_img">
          <Link to={`/product-details/${id}`}>
            <img src={mainImage} alt="product-img" />
          </Link>
        </figure>
        <div className="products_details">
          {/* <span className="rating_star">
            <IoMdStar />
            <IoMdStar />
          </span> */}
          <h3 className="products_title">
            <Link to={`/product-details/${id}`}>{name}</Link>
          </h3>
          {/* <div className="separator"></div> */}
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
