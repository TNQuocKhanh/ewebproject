import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { signup } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";
import { LinearLoading } from "../components/common/Loading";
import { Link } from "react-router-dom";
import Toastify from "../components/product/Toastify";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const signUpBg = "/assets/signup-bg.png";
const googleLogo = "/assets/google-logo.png";

const googleUrl =
  "https://hdkshop.purpletree-ddde814d.westus2.azurecontainerapps.io/oauth2/authorize/google?redirect_uri=https://webshopping.whiteflower-aa9d9f63.westus2.azurecontainerapps.io";

const Register = () => {
  useDocTitle("Đăng ký");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await signup(email, password, fullName);
    console.log("===res", res);
    if (res.status === 201) {
      navigate("/verify");
    } else {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau");
    }
    setLoading(true);
  };

  if (loading) return <LinearLoading />;

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
        <img alt="register" src={signUpBg}></img>
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
              id="showPasswd"
            ></input>
            <label htmlFor="showPasswd">Hiển thị mật khẩu</label>
          </div>
          <div className="row-form">
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
              Đăng ký
            </Button>
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
            <span>
              Bạn đã có tài khoản?
              <a className="form-link" href="/login">
                Đăng nhập
              </a>
            </span>
          </div>
        </form>
      </div>
      <Toastify />
    </div>
  );
};

export default Register;
