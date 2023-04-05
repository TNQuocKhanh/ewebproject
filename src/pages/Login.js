import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { login } from "../apis";
import { storage } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login(email, password);

    if (res.status === 200) {
      const data = await res.json();
      storage.save("user", data);
      navigate("/");
    } else {
      setMessage("Có lỗi xảy ra, vui lòng thử lại");
      console.log("===Login error");
    }
    setIsLoading(false);
  };

  return (
    <div id="page-login">
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
          src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7883.jpg?w=2000"
          alt="logo"
        ></img>
      </div>
      <div className="box-form-login-page">
        <form className="form-login" onSubmit={handleSubmit}>
          <p className="form-title">Đăng nhập</p>
          <div className="row-form">
            <p>{message}</p>
          </div>
          <div className="row-form-field">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Nhập email"
            ></input>
          </div>
          <div className="row-form-field">
            <label>Mật khẩu</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={isShowPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
            ></input>
          </div>
          <div className="row-form">
            <input
              onClick={() => setIsShowPassword(!isShowPassword)}
              type="checkbox"
            ></input>
            <label>Hiển thị mật khẩu</label>
          </div>
          <div className="row-form">
            {isLoading ? (
              <div style={{margin: 'auto'}}>
                <CircularProgress />
              </div>
            ) : (
              <button type="submit">Đăng nhập</button>
            )}
          </div>
          <div className="row-form">
            <p>Hoặc</p>
          </div>
          <div className="row-form-google">
            <Link
              to={
                "http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000"
              }
            >
              <img
                src="https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png"
                alt="GG-icon"
                width={30}
              />
              <span>Đăng nhập với Google</span>
            </Link>
          </div>
          <div className="row-form">
            <a className="form-link" href="/forgot-password">
              Quên mật khẩu?
            </a>
          </div>
          <div className="row-form">
            <span>
              Chưa có tài khoản?
              <a className="form-link" href="/register">
                Đăng ký
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
