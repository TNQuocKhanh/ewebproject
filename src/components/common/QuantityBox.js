import React, { useContext } from "react";
import cartContext from "../../contexts/cart/cartContext";

const QuantityBox = (props) => {
  const { itemId, itemQuantity } = props;

  const { incrementItem, decrementItem, cart } = useContext(cartContext);

  return (
    <>
      <div className="quantity_box">
        <button type="button" onClick={() => decrementItem(itemId)}>
          -
        </button>
        <span className="quantity_count">{itemQuantity}</span>
        <button
          type="button"
          onClick={() => incrementItem(itemId)}
          disabled={itemQuantity >= 5}
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantityBox;
