import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { changePassword } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await changePassword(oldPassword, newPassword);
    if (res.status === 200) {
      navigate("/");
    } else {
      alert("ERROR");
    }
  };

  return (
    <div id="page-register">
      <div className="back-to-home">
        <a href="/">
          <FaArrowLeft />
        </a>
      </div>
      <div className="box-form-login-page">
        <form className="form-login" onSubmit={handleSubmit}>
          <p className="form-title">Thay doi mat khau</p>
          <div className="row-form-field">
            <label>Mat khau cu</label>
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="text"
            ></input>
          </div>
          <div className="row-form-field">
            <label>Mat khau moi</label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

export default ChangePassword;
