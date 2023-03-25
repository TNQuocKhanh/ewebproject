import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { signup } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(email, password, fullName);
    if (res) {
      navigate("/verify");
    } else {
      alert("Co loi xay ra. Vui long thu lai");
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
        <div>
          <h2>Chào mừng bạn đến với HDK Shop</h2>
        </div>
        <img src="https://global-uploads.webflow.com/5fd1e27d738df312147555e1/5ffcc4982f5eb04582ea5200_Mask%20Group.svg"></img>
      </div>
      <div className="box-form-login-page">
        <form className="form-login" onSubmit={handleSubmit}>
          <p className="form-title">Đăng ký tài khoản</p>
          <div className="row-form-field">
            <label>Tên người dùng</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Nhập tên người dùng"
            ></input>
          </div>
          <div className="row-form-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            ></input>
          </div>
          <div className="row-form-field">
            <label>Mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            ></input>
          </div>
          <div className="row-form">
            <input
              onClick={() => setShowPassword(!showPassword)}
              type="checkbox"
            ></input>
            <label>Hiển thị mật khẩu</label>
          </div>
          <div className="row-form">
            <button>Đăng ký</button>
          </div>
          <div className="row-form">
            <p>Hoặc</p>
          </div>
          <div className="row-form-google">
            <button>
              <img src="https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png"></img>
              Đăng nhập với Google
            </button>
          </div>
          <div className="row-form">
            <span>
              Đã có tài khoản?
              <a className="form-link" href="/login">
                Đăng nhập
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
