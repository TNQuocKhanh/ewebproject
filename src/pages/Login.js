import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { login } from "../apis";
import { storage } from "../utils";
import { Link } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import useDocTitle from "../hooks/useDocTitle";

const loginBg = "/assets/login-bg.png";
const googleLogo = "/assets/google-logo.png";

const googleUrl =
  "https://hdkshop.purpletree-ddde814d.westus2.azurecontainerapps.io/oauth2/authorize/google?redirect_uri=https://webshopping.whiteflower-aa9d9f63.westus2.azurecontainerapps.io";
//const googleUrl = "http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000"

const Login = () => {
  useDocTitle("Đăng nhập");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login(email, password);

    if (res.status === 200) {
      const data = await res.json();
      storage.save("user", data);
      window.location.replace("/");
    } else {
      setMessage(
        "Tên đăng nhập hoặc mật khẩu không chính xác, vui lòng thử lại"
      );
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
        <img src={loginBg} alt="logo"></img>
      </div>
      <div className="box-form-login-page">
        <form className="form-login" onSubmit={handleSubmit}>
          <p className="form-title">Đăng nhập</p>
          <div className="row-form">
            <p style={{ color: "red" }}>{message}</p>
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
              id="showPasswd"
            ></input>
            <label htmlFor="showPasswd">Hiển thị mật khẩu</label>
          </div>
          <div className="row-form">
            {isLoading ? (
              <div style={{ margin: "auto" }}>
                <CircularProgress />
              </div>
            ) : (
              <Button
                type="submit"
                disabled={!email || !password}
                sx={{
                  bgcolor: "#f4c24b",
                  width: "100%",
                  padding: "10px",
                  color: "#fff",
                  borderRadius: "5px",
                  ":hover": {
                    bgcolor: "#ff0000cc",
                  },
                }}
              >
                Đăng nhập
              </Button>
            )}
          </div>
          <div className="row-form">
            <p>Hoặc</p>
          </div>
          <div className="row-form-google">
            <Link to={googleUrl}>
              <img src={googleLogo} alt="GG-icon" width={30} />
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
              Bạn chưa có tài khoản?
              <a className="form-link" href="/register">
                Đăng ký ngay
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
