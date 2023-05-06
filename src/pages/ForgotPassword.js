import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { forgotPassword } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";

const forgotPasswdBg = "/assets/forgot-passwd.png";

const ForgotPassword = () => {
  useDocTitle('Quên mật khẩu')
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    const res = await forgotPassword(email);
    if (res.status === 200) {
      navigate("/verify");
    }
  };

  return (
    <div id="page-register">
      <div className="back-to-home">
        <a href="/">
          <FaArrowLeft />
        </a>
      </div>
      <div className="box-img-login-page">
        <img
          alt="forgot-password img"
          style={{ transformX: "scale(-1)" }}
          src={forgotPasswdBg}
        />
      </div>
      <div className="box-form-login-page">
        <form className="form-login" onSubmit={handleSubmit}>
          <p style={{ textAlign: "center", padding: "20px" }}>
            Vui lòng kiểm tra Email trước khi gửi
          </p>
          <p className="form-title">Quên mật khẩu</p>
          <div className="row-form-field">
            <label>Nhập email</label>
            <input
              placeholder="Vui lòng nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            ></input>
          </div>
          <div className="row-form">
            <button>Xác nhận</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
