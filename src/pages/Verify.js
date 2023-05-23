import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { verifyAccount } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";
import { toast } from "react-toastify";
import { LinearLoading } from "../components/common/Loading";
import { Button } from "@mui/material";
import Toastify from "../components/product/Toastify";

const verifyBg = "/assets/verify-img.png";

const Verify = () => {
  useDocTitle("Xác thực người dùng");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isChangePasswd = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyAccount(code);
      if (res.status === 200) {
        if (isChangePasswd) {
          navigate("/new-password");
        } else {
          navigate("/login");
        }
      } else {
        toast.error("Mã xác thực không hợp lệ");
      }
    } catch (err) {
      toast.error("Mã xác thực không hợp lệ");
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
        <img src={verifyBg} alt="verify-logo" />
      </div>
      <div
        className="box-form-login-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <form className="form-login" onSubmit={handleSubmit}>
          <p style={{ textAlign: "center", padding: "50px 0 30px 0" }}>
            *Vui lòng kiểm tra email để hoàn tất xác thực
          </p>
          <p className="form-title">Xác thực tài khoản</p>
          <div className="row-form-field">
            <label>Mã xác thực</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
            ></input>
          </div>
          <div className="row-form">
            <Button
              type="submit"
              disabled={!code}
              sx={{
                bgcolor: !code ? "#f7e59e" : "#f4c24b",
                width: "100%",
                padding: "10px",
                color: "#fff",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#ff0000cc",
                },
              }}
            >
              Xác thực
            </Button>
          </div>
        </form>
      </div>
      <Toastify />
    </div>
  );
};

export default Verify;
