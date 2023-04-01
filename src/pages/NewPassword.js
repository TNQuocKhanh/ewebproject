import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { login } from "../apis";
import { storage } from "../utils";
import { Link, useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);

    if (res.status === 200) {
      const data = await res.json();
      storage.save("user", data);
      navigate("/");
    } else {
      console.log("===Login error");
    }
  };

  return (
    <div id="page-login">
      <div className="back-to-home">
        <a href="/">
          <FaArrowLeft />
        </a>
      </div>
      <div className="box-img-login-page">
        <img src="https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7886.jpg?w=740&t=st=1680333764~exp=1680334364~hmac=0efde700efa8748b58c32ce13fcacde3bccdabbc0bb657a7acbc208800ec4c2a" alt="logo"></img>
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={isShowPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
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
            <button type="submit">Lưu mật khẩu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
