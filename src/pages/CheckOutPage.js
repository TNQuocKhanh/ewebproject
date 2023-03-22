import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import '../styles/partials/pages/_checkout.scss'
import { FaCheckCircle } from "react-icons/fa";

const CheckOutPage = () => {
  return (
    <>
      <Header />
      <section id="checkout">
        <div className="box-form-checkout">
          <h4>Phương thức thanh toán</h4>
          <div className="payment-method">
            <button>
              Tiền mặt
              <div className="check-payment-method">
                <FaCheckCircle />
              </div>
            </button>
            <button>
              <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png" alt=""></img>
              <div className="check-payment-method">
                <FaCheckCircle />
              </div>
            </button>
          </div>
          <h4>Thông tin thanh toán</h4>
          <div className="payment-infor">
            <div className="row-form-payment">
              <label>Họ và tên người nhận</label>
              <input type='text' placeholder="Nhập họ và tên người nhận"></input>
            </div>
            <div className="row-form-payment">
              <label>Địa chỉ giao hàng</label>
              <input type='text' placeholder="Nhập địa chỉ giao hàng"></input>
            </div>
            <div className="row-form-payment">
              <label>Số điện thoại người nhận</label>
              <input type='number' placeholder="Nhập số điện thoại"></input>
            </div>
          </div>
        </div>
        <div className="box-item-checkout">
          <h4>Thông tin đơn hàng</h4>
          <div className="check-item">
            <div className="row-item-cart">
              <img src="https://st4.tkcomputer.vn/uploads/dell_inspiron_3511_1635936929_1024.jpg" alt=""></img>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ paddingBottom: '10px', fontSize: '13px' }}>Tên: DELL 120xr Gaming</p>
                <p style={{ fontSize: '13px' }}>SL: 1</p>
              </div>
              <strong style={{ fontSize: '13px' }}>12.000.000 VNĐ</strong>
            </div>
            <div className="row-item-cart">
              <img src="https://st4.tkcomputer.vn/uploads/dell_inspiron_3511_1635936929_1024.jpg" alt=""></img>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ paddingBottom: '10px', fontSize: '13px' }}>Tên: DELL 120xr Gaming</p>
                <p style={{ fontSize: '13px' }}>SL: 1</p>
              </div>
              <strong style={{ fontSize: '13px' }}>12.000.000 VNĐ</strong>
            </div>
            <div className="row-item-cart">
              <img src="https://st4.tkcomputer.vn/uploads/dell_inspiron_3511_1635936929_1024.jpg" alt=""></img>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ paddingBottom: '10px', fontSize: '13px' }}>Tên: DELL 120xr Gaming</p>
                <p style={{ fontSize: '13px' }}>SL: 1</p>
              </div>
              <strong style={{ fontSize: '13px' }}>12.000.000 VNĐ</strong>
            </div>
          </div>
          <div className="total-price">
            <div className="row-total-price">
              <strong>
                Tổng giá sản phẩm:
              </strong>
              <p>
                19.000.000 VNĐ
              </p>
            </div>
            <div className="row-total-price">
              <strong>
                Ship:
              </strong>
              <p>
                190.000 VNĐ
              </p>
            </div>
            <div className="row-total-price">
              <strong>
                Thành tiền:
              </strong>
              <p style={{ fontSize: '25px', color: 'red' }}>
                19.000.000 VNĐ
              </p>
            </div>
          </div>
          <div>
            <button className="btn-checkout">Thanh toán</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CheckOutPage;
