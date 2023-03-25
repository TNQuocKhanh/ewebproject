import React, { useContext, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../styles/partials/pages/_checkout.scss";
import { FaCheckCircle } from "react-icons/fa";
import cartContext from "../contexts/cart/cartContext";
import { createOrder, createPayment } from "../apis";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState(1);

  const [district, setDistrict] = useState();
  const [street, setStreet] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const { cartItems } = useContext(cartContext);
  console.log("===cartItems", cartItems);

  const item = [];
  cartItems.map((it) =>
    item.push({ productId: it.id, quantity: 1, productPrice: it.discountPrice })
  );

  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.discountPrice, 0);

  const handleCheckout = async () => {
    const value = {
      shippingAddress: { district, street, phoneNumber },
      paymentMethod: method === 1 ? "COD" : "VNPay",
      totalPrice: totalPrice,
      lineItem: item,
    };

    if (method === 1) {
      const res = await createOrder(value);
      if (res) {
        navigate("/");
      } else {
        alert("Dat hang ko thanh cong");
      }
    } else {
      const res = await createPayment({ totalPrice: totalPrice.toString() });
      if (res.status === 200) {
        const url = await res.json();

        console.log("====url", url.url);
        window.location.replace(url.url);
      }
    }
  };

  return (
    <>
      <Header />
      <section id="checkout">
        <div className="box-form-checkout">
          <h4>Phương thức thanh toán</h4>
          <div className="payment-method">
            <button onClick={() => setMethod(1)}>
              Tiền mặt
              <div className="check-payment-method">
                {method === 1 && <FaCheckCircle />}
              </div>
            </button>
            <button onClick={() => setMethod(2)}>
              <img
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
                alt=""
              ></img>
              <div className="check-payment-method">
                {method === 2 && <FaCheckCircle />}
              </div>
            </button>
          </div>
          <h4>Thông tin thanh toán</h4>
          <div className="payment-infor">
            <div className="row-form-payment">
              <label>District</label>
              <input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="row-form-payment">
              <label>Street</label>
              <input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="row-form-payment">
              <label>SDT</label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
              ></input>
            </div>
          </div>
        </div>
        <div className="box-item-checkout">
          <h4>Thông tin đơn hàng</h4>
          <div className="check-item">
            <div className="row-item-cart">
              <img
                src="https://st4.tkcomputer.vn/uploads/dell_inspiron_3511_1635936929_1024.jpg"
                alt=""
              ></img>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ paddingBottom: "10px", fontSize: "13px" }}>
                  Tên: DELL 120xr Gaming
                </p>
                <p style={{ fontSize: "13px" }}>SL: 1</p>
              </div>
              <strong style={{ fontSize: "13px" }}>12.000.000 VNĐ</strong>
            </div>
            <div className="row-item-cart">
              <img
                src="https://st4.tkcomputer.vn/uploads/dell_inspiron_3511_1635936929_1024.jpg"
                alt=""
              ></img>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ paddingBottom: "10px", fontSize: "13px" }}>
                  Tên: DELL 120xr Gaming
                </p>
                <p style={{ fontSize: "13px" }}>SL: 1</p>
              </div>
              <strong style={{ fontSize: "13px" }}>12.000.000 VNĐ</strong>
            </div>
            <div className="row-item-cart">
              <img
                src="https://st4.tkcomputer.vn/uploads/dell_inspiron_3511_1635936929_1024.jpg"
                alt=""
              ></img>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ paddingBottom: "10px", fontSize: "13px" }}>
                  Tên: DELL 120xr Gaming
                </p>
                <p style={{ fontSize: "13px" }}>SL: 1</p>
              </div>
              <strong style={{ fontSize: "13px" }}>12.000.000 VNĐ</strong>
            </div>
          </div>
          <div className="total-price">
            <div className="row-total-price">
              <strong>Tổng giá sản phẩm:</strong>
              <p>19.000.000 VNĐ</p>
            </div>
            <div className="row-total-price">
              <strong>Ship:</strong>
              <p>190.000 VNĐ</p>
            </div>
            <div className="row-total-price">
              <strong>Thành tiền:</strong>
              <p style={{ fontSize: "25px", color: "red" }}>19.000.000 VNĐ</p>
            </div>
          </div>
          <div>
            <button onClick={handleCheckout} className="btn-checkout">
              Thanh toán
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CheckOutPage;
