import React, { useState } from "react";
import "../styles/partials/pages/_change_password.scss";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
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
    <>
      <Header />
      <div id="page-change-password" className="container">
        <div className="box-form-change-password">
          <form className="form-change-password" onSubmit={handleSubmit}>
            <p className="form-title">Thay đổi mật khẩu</p>
            <div className="row-form-field">
              <label>Mật khẩu cũ</label>
              <input
                placeholder="Nhập mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="row-form-field">
              <label>Mật khẩu mới</label>
              <input
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="row-form">
              <button style={{color: 'white'}}>Thay đổi mật khẩu</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
