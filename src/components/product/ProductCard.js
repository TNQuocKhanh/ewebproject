import React, { useContext } from "react";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import cartContext from "../../contexts/cart/cartContext";
import useActive from "../../hooks/useActive";

const ProductCard = (props) => {
  const { id, name, discountPrice, price, discountPercent, mainImage } = props;

  const { addItem } = useContext(cartContext);
  const { active, handleActive, activeClass } = useActive(false);

  const handleAddItem = () => {
    const item = { ...props };
    addItem(item);

    handleActive(id);

    setTimeout(() => {
      handleActive(false);
    }, 3000);
  };

  const newPrice = displayMoney(discountPrice);
  const oldPrice = displayMoney(price);

  return (
    <>
      <div className="card products_card">
        <figure className="products_img">
          <Link to={`/product-details/${id}`}>
            <img src={mainImage} alt="product-img" />
          </Link>
        </figure>
        <div className="products_details">
          <span className="rating_star">
            <IoMdStar />
            <IoMdStar />
          </span>
          <h3 className="products_title">
            <Link to={`/product-detail/${id}`}>{name}</Link>
          </h3>
          <div className="separator"></div>
          <h2 className="products_price">
            <h4 style={{ marginBottom: "5px" }}>{newPrice}</h4>
            <small>
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
