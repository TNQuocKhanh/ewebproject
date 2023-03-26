import React, { useState } from "react";
import "../styles/partials/pages/_profile.scss";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
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
    <>
      <Header />
      <div id="page-profile" className="container">
        <div className="box-form-profile">
          <form className="form-profile" onSubmit={handleSubmit}>
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
              <button>Xác thực</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
