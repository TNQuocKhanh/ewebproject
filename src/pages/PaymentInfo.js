import React, { useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import _ from "lodash";
import { createOrder, createPaymentInfo } from "../apis";

export const PaymentInfo = () => {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);

  const order = JSON.parse(localStorage.getItem('order'))

  const data = {};

  for (let part of urlParams.entries()) {
    _.set(data, part[0], part[1]);
  }

  const _data = {
    vnpTxnRef: data.vnp_TxnRef,
    amount: data.vnp_Amount,
    //amount: data.vnp_Amount.slice(0, -2),
    vnpBankCode: data.vnp_BankCode,
    vnpBankTranNo: data.vnp_BankTranNo,
    vnpCardType: data.vnp_CardType,
    vnpOrderInfo: data.vnp_OrderInfo,
    vnpPayDate: data.vnp_PayDate,
    vnpResponseCode: data.vnp_ResponseCode,
    vnpTmnCode: data.vnp_TmnCode,
    vnpTransactionNo: data.vnp_TransactionNo,
    vnpTransactionStatus: data.vnp_TransactionStatus,
    vnpSecureHash: data.vnp_SecureHash,
  };

  const savePayment = async () => {
    try {
      await createPaymentInfo(_data);
    } catch (error) {
      console.log("===ERROR", error);
    }
  };
  
  const saveOrder = async () => {
    try {
      await createOrder(order)
      localStorage.removeItem('order')
    } catch (error) {
      console.log("===ERROR", error);
    }
  };

  useEffect(() => {
    savePayment();
    saveOrder()
  }, []);

  return (
    <div>
      <Header />
      <div
        className="container"
        style={{
          margin: "13rem auto 0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "#49a255",
            minWidth: "400px",
            padding: "20px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <FaCheckCircle style={{ fontSize: "40px", color: "white" }} />
        </div>
        <div
          style={{
            background: "white",
            minWidth: "400px",
            padding: "20px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <p style={{ color: "green", fontSize: "20px", padding: "30px 0" }}>
            Thanh toán thành công
          </p>
          <Link to="/">
            <button
              style={{
                background: "var(--main-color)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              Quay lại
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
