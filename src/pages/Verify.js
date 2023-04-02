import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { verifyAccount } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const isChangePasswd = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("===", code);
    const res = await verifyAccount(code);
    if (res) {
      if (isChangePasswd) {
        navigate("/new-password");
      } else {
        navigate("/login");
      }
    } else {
      alert("Ma xac thuc khong hop le");
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
          src="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7887.jpg?w=740&t=st=1680333161~exp=1680333761~hmac=65f91748b038e0de266961794a312f6e8868d5c1ef433f466118f4a19529f2e1"
          alt="verify-logo"
        />
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
            <button>Xác thực</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
