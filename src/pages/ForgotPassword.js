import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { forgotPassword } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";
import { LinearLoading } from "../components/common/Loading";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Toastify from "../components/product/Toastify";

const forgotPasswdBg = "/assets/forgot-passwd.png";

const ForgotPassword = () => {
  useDocTitle("Quên mật khẩu");
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("email", email);
    try {
      const res = await forgotPassword(email);
      if (res.status === 200) {
        navigate("/verify");
      } else {
        toast.info("Tài khoản không tồn tại");
      }
    } catch (err) {
      console.log("Error", e);
    }
    setLoading(false);
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
              type="email"
            ></input>
          </div>
          <div className="row-form">
            <Button
              type="submit"
              disabled={!email}
              sx={{
                bgcolor: !email ? "#f7e59e" : "#f4c24b",
                width: "100%",
                padding: "10px",
                color: "#fff",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#ff0000cc",
                },
              }}
            >
              Xác nhận
            </Button>
          </div>
        </form>
      </div>
      <Toastify />
    </div>
  );
};

export default ForgotPassword;
