import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { createNewPassword } from "../apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toastify from "../components/product/Toastify";
import useDocTitle from "../hooks/useDocTitle";
import { LinearLoading } from "../components/common/Loading";

const resetPasswdBg = "/assets/reset-passwd.png";

const NewPassword = () => {
  useDocTitle("Tạo mới mật khẩu");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== rePassword) {
      toast.info("Mật khẩu không trùng khớp");
    }

    try {
      const res = await createNewPassword(email, password);
      if (res.status === 200) {
        await res.json();
        localStorage.removeItem("email");
        navigate("/login");
      }
    } catch (err) {
      console.log("===Change new password error");
    }
    setLoading(false);
  };

  if (loading) return <LinearLoading />;

  return (
    <div id="page-login">
      <div className="back-to-home">
        <a href="/">
          <FaArrowLeft />
        </a>
      </div>
      <div className="box-img-login-page">
        <img src={resetPasswdBg} alt="logo" />
      </div>
      <div className="box-form-login-page">
        <form className="form-login" onSubmit={handleSubmit}>
          <p className="form-title">Tạo mới mật khẩu</p>
          <div className="row-form-field">
            <label>Mật khẩu mới</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={isShowPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
            ></input>
          </div>
          <div className="row-form-field">
            <label>Nhập lại mật khẩu mới</label>
            <input
              onChange={(e) => setRePassword(e.target.value)}
              value={rePassword}
              type={isShowPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
            ></input>
          </div>
          <div className="row-form">
            <input
              onClick={() => setIsShowPassword(!isShowPassword)}
              type="checkbox"
            ></input>
            <label>Hiển thị mật khẩu</label>
          </div>
          <div className="row-form">
            <button disabled={!password || !rePassword} type="submit">Lưu mật khẩu</button>
          </div>
        </form>
      </div>
      <Toastify />
    </div>
  );
};

export default NewPassword;
