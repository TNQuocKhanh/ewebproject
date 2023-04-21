import React, { useContext } from "react";
import { BsCartX } from "react-icons/bs";
import useDocTitle from "../hooks/useDocTitle";
import cartContext from "../contexts/cart/cartContext";
import CartItem from "../components/cart/CartItem";
import EmptyView from "../components/common/EmptyView";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { formatPrice, storage } from "../utils";

const Cart = () => {
  useDocTitle("Cart");

  const { cart } = useContext(cartContext);
  const cartQuantity = cart.length;

  const calculateCartTotal = cart.reduce((val, acc) => {
    return val + acc.quantity * acc.price;
  }, 0);

  const cartDiscount = cart.map((item) => {
    return (item.price - item.discountPrice) * 1;
  });

  const calculateCartDiscount = cartDiscount.reduce(
    (accum, val) => accum + val,
    0
  );

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
                      <b>{formatPrice(calculateCartTotal)}</b>
                    </div>
                    <div className="discount">
                      <span>Giảm</span>
                      <b>- {formatPrice(calculateCartDiscount)}</b>
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
                      <b>{formatPrice(totalAmount)}</b>
                    </div>
                  </div>
                  {storage.load("user") ? (
                    <Link to="/checkout">
                      <button type="button" className="btn checkout_btn">
                        Thanh toán
                      </button>
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={true}
                        className="btn checkout_btn"
                      >
                        Thanh toán
                      </button>
                    </>
                  )}
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
