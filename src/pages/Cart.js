import React, { useContext } from "react";
import { BsCartX } from "react-icons/bs";
import { calculateTotal, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import cartContext from "../contexts/cart/cartContext";
import CartItem from "../components/cart/CartItem";
import EmptyView from "../components/common/EmptyView";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { storage } from "../utils";
import _ from 'lodash'

const Cart = () => {
  useDocTitle("Cart");

  const { cartItems } = useContext(cartContext);

  console.log('===', cartItems)

  const cartQuantity = cartItems.length;

  const ids = cartItems.map(it => it.id)

  const arrId = [ ...new Set(ids)]
console.log('===', arrId)

  let  newArr = []
  arrId.map(it => {
    const found = cartItems.find(v => v.id !== it)
    if(newArr.filter(v => v.id ===found.id)){
      newArr.push(found)
    }else{
      newArr.push({...found, quantity: found.quantity++})
    }
  })

  const cartTotal = cartItems.map((item) => {
    return item.price * 1;
  });

  const calculateCartTotal = calculateTotal(cartTotal);
  const displayCartTotal = displayMoney(calculateCartTotal);

  const cartDiscount = cartItems.map((item) => {
    return (item.price - item.discountPrice) * 1;
  });

  const calculateCartDiscount = calculateTotal(cartDiscount);
  const displayCartDiscount = displayMoney(calculateCartDiscount);

  const totalAmount = calculateCartTotal - calculateCartDiscount;
  const displayTotalAmount = displayMoney(totalAmount);

  return (
    <>
      <Header />
      <section id="cart" className="section">
        <div className="container">
          {cartQuantity === 0 ? (
            <EmptyView
              icon={<BsCartX />}
              msg="Giỏ hàng trống"
              link="/all-products"
              btnText="Mua ngay"
            />
          ) : (
            <div className="wrapper cart_wrapper">
              <div className="cart_left_col">
                {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} quantity={1} />
                ))}
              </div>

              <div className="cart_right_col">
                <div className="order_summary">
                  <h3>Tổng đơn hàng &nbsp; ( {cartQuantity} sản phẩm )</h3>
                  <div className="order_summary_details">
                    <div className="price">
                      <span>Giá gốc</span>
                      <b>{displayCartTotal}</b>
                    </div>
                    <div className="discount">
                      <span>Giảm</span>
                      <b>- {displayCartDiscount}</b>
                    </div>
                    <div className="delivery">
                      <span>Giao hàng</span>
                      <b>Free</b>
                    </div>
                    <div className="separator"></div>
                    <div className="total_price">
                      <b>
                        <small>Tổng tiền</small>
                      </b>
                      <b>{displayTotalAmount}</b>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <button type="button" className="btn checkout_btn">
                      Thanh toán
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
