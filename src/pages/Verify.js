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
        <img src="https://cdn.dribbble.com/users/1040516/screenshots/14598364/media/b664b20ff7f8b82c667c450517fc629c.png?compress=1&resize=1000x750&vertical=top"></img>
      </div>
      <div className="box-form-login-page" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <form className="form-login" onSubmit={handleSubmit}>
          <p style={{ textAlign: "center", padding: '50px 0 30px 0' }}>
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
