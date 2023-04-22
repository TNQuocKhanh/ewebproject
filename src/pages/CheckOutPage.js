import React, { useContext, useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../styles/partials/pages/_checkout.scss";
import { FaCheckCircle } from "react-icons/fa";
import cartContext from "../contexts/cart/cartContext";
import { createOrder, createPayment, getProfile } from "../apis";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatPrice } from "../utils";
import Messenger from "../components/common/Messenger";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({});
  const [address, setAddress] = useState();
  const [note, setNote] = useState();

  const { cart } = useContext(cartContext);

  const item = [];
  cart.map((it) =>
    item.push({ productId: it.id, quantity: 1, productPrice: it.discountPrice })
  );

  const getUserProfile = async () => {
    const res = await getProfile();
    setAddress(res.address);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.discountPrice * cur.quantity,
    0
  );

  const handleCheckout = async () => {
    const value = {
      shippingAddress: {
        district: shippingAddress.district,
        street: shippingAddress.street,
        phoneNumber: shippingAddress.phoneNumber,
      },
      paymentMethod: method === 1 ? "COD" : "VNPay",
      totalPrice: totalPrice,
      lineItem: item,
      note,
    };

    if (method === 1) {
      const res = await createOrder(value);
      if (res.status === 201) {
        alert("Đặt hàng thành công");
        localStorage.removeItem("myCart");
        navigate("/");
      } else {
        console.log("[Create order] error", res);
        alert("Có lỗi xảy ra");
      }
    } else {
      const res = await createPayment({ totalPrice: totalPrice.toString() });
      localStorage.setItem("order", JSON.stringify(value));
      if (res.status === 200) {
        const url = await res.json();
        window.location.replace(url.url);
      }
    }
  };

  const handleChange = (e) => {
    setShippingAddress(e.target.value);
  };

  return (
    <>
      <Header />
      <section id="checkout" className="container">
        <div className="box-form-checkout">
          <h4>Phương thức thanh toán</h4>
          <div className="payment-method">
            <button style={{ border: method === 1 && '1px solid rgb(0, 0, 186)' }} onClick={() => setMethod(1)}>
              <strong>Thanh toán khi nhận hàng</strong>
              <div className="check-payment-method">
                {method === 1 && <FaCheckCircle />}
              </div>
            </button>
            <button style={{ border: method === 2 && '1px solid rgb(0, 0, 186)' }} onClick={() => setMethod(2)}>
              <strong>Thanh toán VNPay<small style={{color: 'white', background: 'rgb(0, 0, 186)', padding: '5px', borderRadius: '5px', fontSize: '10px', marginLeft: '10px'}}>Khuyên dùng</small></strong>
              <p style={{marginTop: '20px', lineHeight: '30px', color:'#aaaaaa', fontSize: '13px', padding: '0 20px'}}>Thanh toán qua Internet Banking, Visa, Master, JBC, VNPay-QR</p>
              <div className="check-payment-method">
                {method === 2 && <FaCheckCircle />}
              </div>
            </button>
          </div>
          <h4>Thông tin thanh toán</h4>
          <div className="payment-infor">
            <FormControl fullWidth>
              <InputLabel>Địa chỉ</InputLabel>
              <Select label="Địa chỉ" onChange={handleChange}>
                {address?.map((item) => {
                  return (
                    <MenuItem
                      value={item}
                    >{`${item.name} | ${item.phoneNumber}, ${item.street}, ${item.district}
                        `}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <h4 style={{ marginTop: '20px' }}>Ghi chú</h4>
          <textarea
            placeholder="Ghi chú cho người bán"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              border: "1px solid #cccccc",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "15px",
              width: '100%',
            }}
          />
        </div>
        <div className="box-item-checkout">
          <h4>Thông tin đơn hàng</h4>
          <div className="check-item">
            {cart.map((it) => {
              return (
                <div>
                  <div className="row-item-cart">
                    <div style={{ display: "flex" }}>
                      <img src={it.mainImage} alt={it.name}></img>
                      <div style={{ marginLeft: "20px" }}>
                        <p style={{ paddingBottom: "10px", fontSize: "13px" }}>
                          Tên: {it.name} <br />
                        </p>
                        <p style={{ fontSize: "13px" }}>x {it.quantity}</p>
                      </div>
                    </div>
                    <strong style={{ fontSize: "13px" }}>
                      {formatPrice(it.quantity * it.discountPrice)}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="total-price">
            <div className="row-total-price">
              <strong>Thành tiền:</strong>
              <p style={{ fontSize: "25px", color: "red" }}>
                {formatPrice(totalPrice)}
              </p>
            </div>
          </div>
          <div>
            <button disabled onClick={handleCheckout} className="btn-checkout">
              Thanh toán
            </button>
          </div>
        </div>
      </section>
      <Messenger/>
      <Footer />
    </>
  );
};

export default CheckOutPage;
