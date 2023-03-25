import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { verifyAccount } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("===", code);
    const res = await verifyAccount(code);
    if (res) {
      navigate("/");
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
        <img src="https://global-uploads.webflow.com/5fd1e27d738df312147555e1/5ffcc4982f5eb04582ea5200_Mask%20Group.svg"></img>
      </div>
      <div className="box-form-login-page">
        <form className="form-login" onSubmit={handleSubmit}>
          <p style={{ textAlign: "center" }}>
            Vui lòng kiểm tra email để hoàn tất xác thực
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
