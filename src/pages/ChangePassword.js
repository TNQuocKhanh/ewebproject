import React, { useState } from "react";
import "../styles/partials/pages/_change_password.scss";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { changePassword } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toastify from "../components/product/Toastify";
import useDocTitle from "../hooks/useDocTitle";
import { Loading } from "../components/common/Loading";

const ChangePassword = () => {
  useDocTitle('Thay đổi mật khẩu')
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const res = await changePassword(oldPassword, newPassword);
    console.log("===res", res);
    if (res.status === 200) {
      toast.success("Thay đổi mật khẩu thành công");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Mật khẩu cũ không trùng khớp");
    }
    setLoading(false)
  };

  if(loading) return <Loading /> 

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
              <button style={{ color: "white" }}>Thay đổi mật khẩu</button>
            </div>
          </form>
        </div>
      </div>
      <Toastify />
      <Footer />
    </>
  );
};

export default ChangePassword;
