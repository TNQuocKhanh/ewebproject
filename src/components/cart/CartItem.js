import React, { useContext } from "react";
import { TbTrash } from "react-icons/tb";
import { displayMoney } from "../../helpers/utils";
import cartContext from "../../contexts/cart/cartContext";
import QuantityBox from "../common/QuantityBox";

const CartItem = (props) => {
  const { id, name, quantity, mainImage, price, discountPrice } = props;

  const { removeItem } = useContext(cartContext);

  const newPrice = displayMoney(discountPrice);
  const oldPrice = displayMoney(price);

  return (
    <>
      <div className="cart_item">
        <figure className="cart_item_img">
          <img style={{ width: "70%" }} src={mainImage} alt={name} />
        </figure>
        <div className="cart_item_info">
          <div className="cart_item_head">
            <h4 className="cart_item_title">{name}</h4>
            <QuantityBox itemId={id} itemQuantity={quantity} />
            <div className="cart_item_del">
              <span onClick={() => removeItem(id)}>
                <TbTrash
                  style={{
                    background: "red",
                    color: "white",
                    padding: "5px",
                    fontSize: "2rem",
                    borderRadius: "7px",
                  }}
                />
              </span>
              <div className="tooltip">Xóa sản phẩm</div>
            </div>
          </div>
          <h2 className="cart_item_price" style={{ fontWeight: "600" }}>
            {newPrice} &nbsp;
            <small style={{ fontWeight: "500" }}>
              <del>{oldPrice}</del>
            </small>
          </h2>
        </div>
      </div>
    </>
  );
};

export default CartItem;
