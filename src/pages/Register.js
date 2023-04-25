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
    console.log("===res", res);
    if (res.status === 201) {
      navigate("/verify");
    } else {
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
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
        <img
          alt="register"
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=740&t=st=1680333360~exp=1680333960~hmac=720947a276467d95c3783f1a254f7a5bee7169d4be939398ea56fad53c3d9ca4"
        ></img>
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
              required
            ></input>
          </div>
          <div className="row-form-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              required
            ></input>
          </div>
          <div className="row-form-field">
            <label>Mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
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
              <img
                src="https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png"
                alt="google-logo"
              ></img>
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
