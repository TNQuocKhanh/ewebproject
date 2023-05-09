import React, { useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import _ from "lodash";
import { createOrder, createPaymentInfo } from "../apis";
import useDocTitle from "../hooks/useDocTitle";

export const PaymentInfo = () => {
  useDocTitle('Thông tin đơn hàng')
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);

  const order = JSON.parse(localStorage.getItem("order"));

  const data = {};

  for (let part of urlParams.entries()) {
    _.set(data, part[0], part[1]);
  }

  const _data = {
    vnpTxnRef: data.vnp_TxnRef,
    amount: data.vnp_Amount,
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
      const res = await createPaymentInfo(_data);
      console.log("====res", res);
      if (res.status === 200) {
        await createOrder(order);
        localStorage.removeItem("order");
        localStorage.removeItem("myCart");
        window.location.replace('/')
      }
    } catch (error) {
      console.log("[Save payment] error", error);
    }
  };

  useEffect(() => {
    savePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
