import React, { useContext } from "react";
import { TbTrash } from "react-icons/tb";
import cartContext from "../../contexts/cart/cartContext";
import QuantityBox from "../common/QuantityBox";
import {formatPrice} from "../../utils/format";

const CartItem = (props) => {
  const { id, name, quantity, mainImage, price, discountPrice } = props;

  const { removeItem } = useContext(cartContext);

  const newPrice =formatPrice(discountPrice);
  const oldPrice = formatPrice(price);

  return (
    <>
      <div className="cart_item" style={{ gap: '0' }}>
        <figure className="cart_item_img" style={{ margin: '0' }}>
          <img style={{ width: "60%" }} src={mainImage} alt={name} />
          </figure>
        <div className="cart_item_info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div className="cart_item_head" style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '50%', width: '50%' }}>
              <h4 className="cart_item_title">{name}</h4>
              <strong  style={{ fontWeight: "600", margin: '0' }}>
                {newPrice} &nbsp;
                <small style={{ fontWeight: "500" }}>
                  <del>{oldPrice}</del>
                </small>
              </strong>
            </div>
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
        </div>
      </div>
    </>
  );
};

export default CartItem;
