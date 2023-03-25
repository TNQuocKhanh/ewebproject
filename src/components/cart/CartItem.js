import React, { useContext } from "react";
import { TbTrash } from "react-icons/tb";
import { displayMoney } from "../../helpers/utils";
import cartContext from "../../contexts/cart/cartContext";
import QuantityBox from "../common/QuantityBox";

const CartItem = (props) => {
  const { id, name,  quantity, mainImage, price, discountPrice } =
    props;

  const { removeItem } = useContext(cartContext);

  const newPrice = displayMoney(discountPrice);
  const oldPrice = displayMoney(price);

  return (
    <>
      <div className="cart_item">
        <figure className="cart_item_img">
            <img src={mainImage} alt="product-img" />
        </figure>
        <div className="cart_item_info">
          <div className="cart_item_head">
            <h4 className="cart_item_title">
                {name}
            </h4>
            <div className="cart_item_del">
              <span onClick={() => removeItem(id)}>
                <TbTrash />
              </span>
              <div className="tooltip">Xoa</div>
            </div>
          </div>

          <h2 className="cart_item_price">
            {newPrice} &nbsp;
            <small>
              <del>{oldPrice}</del>
            </small>
          </h2>

          <QuantityBox itemId={id} itemQuantity={quantity} />
        </div>
      </div>
    </>
  );
};

export default CartItem;
