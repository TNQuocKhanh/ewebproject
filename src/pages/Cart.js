import React, { useContext, useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { calculateTotal, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import cartContext from "../contexts/cart/cartContext";
import CartItem from "../components/cart/CartItem";
import EmptyView from "../components/common/EmptyView";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Cart = () => {
  useDocTitle("Cart");

  //const { cart } = useContext(cartContext);

  const cart = JSON.parse(localStorage.getItem('cart'))

  const cartQuantity = cart.length;

  const calculateCartTotal = cart.reduce((val, acc) => {
    return val + acc.quantity * acc.price;
  }, 0);

  const cartDiscount = cart.map((item) => {
    return (item.price - item.discountPrice) * 1;
  });

  const calculateCartDiscount = calculateTotal(cartDiscount);

  const totalAmount = calculateCartTotal - calculateCartDiscount;

  return (
    <>
      <Header />
      <section id="cart" className="section">
        <div className="container">
          {cartQuantity === 0 ? (
            <EmptyView
              icon={<BsCartX />}
              msg="Giỏ hàng chưa có sản phẩm nào"
              link="/all-products"
              btnText="Mua sắm ngay"
            />
          ) : (
            <div className="wrapper cart_wrapper">
              <div>
                {cart.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>

              <div
                className="cart_right_col"
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <div className="order_summary">
                  <h3>Tổng đơn hàng &nbsp; ( {cartQuantity} sản phẩm )</h3>
                  <div className="order_summary_details">
                    <div className="price">
                      <span>Giá gốc</span>
                      <b>{calculateCartTotal}</b>
                    </div>
                    <div className="discount">
                      <span>Giảm</span>
                      <b>- {calculateCartDiscount}</b>
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
                      <b>{totalAmount}</b>
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
