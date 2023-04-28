import React, { useContext, useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../styles/partials/pages/_checkout.scss";
import { FaCheckCircle } from "react-icons/fa";
import cartContext from "../contexts/cart/cartContext";
import {
  createOrder,
  createPayment,
  getProfile,
  getServices,
  getShippingFee,
} from "../apis";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils";
import Messenger from "../components/common/Messenger";
import { ProfileAddress } from "./Address";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState(1);
  const [address, setAddress] = useState();
  const [note, setNote] = useState();
  const [lineItem, setLineItem] = useState();

  const [valueAddress, setValueAddress] = useState();

  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState();

  const { cart } = useContext(cartContext);

  const getUserProfile = async () => {
    const res = await getProfile();
    setAddress(res.address);
  };

  const getAllService = async () => {
    const { data = [] } = await getServices(valueAddress?.districtId);
    setServices(data);
  };

  useEffect(() => {
    getUserProfile();
    if (valueAddress?.districtId) {
      getAllService();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueAddress?.districtId]);

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.discountPrice * cur.quantity,
    0
  );

  const totalShipping =
    lineItem &&
    lineItem.length > 0 &&
    lineItem.reduce((acc, cur) => acc + cur.shippingFee * cur.quantity, 0);

  const handleCheckout = async () => {
    const value = {
      shippingAddress: {
        receiver: valueAddress.name,
        phoneNumber: valueAddress.phoneNumber,
        districtId: valueAddress.districtId,
        district: valueAddress.district,
        wardCode: valueAddress.wardCode,
        ward: valueAddress.ward,
        street: valueAddress.street,
      },
      paymentMethod: method === 1 ? "COD" : "VNPay",
      totalPrice: totalPrice,
      lineItem: lineItem,
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
        console.log("===url", url);
        window.location.replace(url.url);
      }
    }
  };

  const calculateShipping = async () => {
    const test = {
      service_id: serviceId,
      insurance_value: 5000000,
      from_district_id: 3695,
      to_district_id: valueAddress?.districtId,
      to_ward_code: valueAddress?.wardCode,
      height: 15,
      length: 15,
      weight: 5000,
      width: 15,
    };

    const items = [];
    try {
      const getFee = async (val) => {
        try {
          if (val.service_id) {
            const { data: res } = await getShippingFee(val);
            return res;
          }
        } catch (err) {
          console.log(err);
        }
      };

      const cartNew = await Promise.all(cart.map((v) => getFee(test)));
      cart.forEach((it, idx) => {
        items.push({
          productId: it.id,
          quantity: it.quantity,
          productPrice: it.discountPrice,
          shippingFee: cartNew[idx]?.total,
        });
      });
      setLineItem(items);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    calculateShipping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  return (
    <>
      <Header />
      <section id="checkout" className="container">
        <div className="box-form-checkout">
          <h4>Phương thức thanh toán</h4>
          <div className="payment-method">
            <button
              style={{ border: method === 1 && "1px solid rgb(0, 0, 186)" }}
              onClick={() => setMethod(1)}
            >
              <strong>Thanh toán khi nhận hàng</strong>
              <div className="check-payment-method">
                {method === 1 && <FaCheckCircle />}
              </div>
            </button>
            <button
              style={{ border: method === 2 && "1px solid rgb(0, 0, 186)" }}
              onClick={() => setMethod(2)}
            >
              <strong>
                Thanh toán VNPay
                <small
                  style={{
                    color: "white",
                    background: "rgb(0, 0, 186)",
                    padding: "5px",
                    borderRadius: "5px",
                    fontSize: "10px",
                    marginLeft: "10px",
                  }}
                >
                  Khuyên dùng
                </small>
              </strong>
              <div className="check-payment-method">
                {method === 2 && <FaCheckCircle />}
              </div>
            </button>
          </div>
          <h4>Thông tin thanh toán</h4>
          <ProfileAddress
            address={address}
            canChoose={true}
            setValueAddress={setValueAddress}
          />
          <FormControl>
            <h4>Phương thức giao hàng</h4>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {services &&
                services.map((it, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={it.service_id}
                    control={<Radio />}
                    label={it.short_name}
                    onChange={(e) => setServiceId(e.target.value)}
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <h4 style={{ marginTop: "20px" }}>Ghi chú</h4>
          <textarea
            placeholder="Ghi chú cho người bán"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              border: "1px solid #cccccc",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "15px",
              width: "100%",
            }}
          />
        </div>
        <div className="box-item-checkout">
          <h4>Thông tin đơn hàng</h4>
          <div className="check-item">
            {cart.map((it, idx) => {
              return (
                <div key={idx}>
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
            {serviceId && (
              <div className="row-total-price">
                <strong>Phí vận chuyển:</strong>
                <p style={{ fontSize: "20px", color: "red" }}>
                  {formatPrice(totalShipping)}
                </p>
              </div>
            )}
          </div>
          <div>
            <button
              disabled={!valueAddress?.districtId || !serviceId}
              onClick={handleCheckout}
              className="btn-checkout"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </section>
      <Messenger />
      <Footer />
    </>
  );
};

export default CheckOutPage;
