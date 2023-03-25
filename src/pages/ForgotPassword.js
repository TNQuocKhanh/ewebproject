import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { forgotPassword } from "../apis/customer.api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState()

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    localStorage.setItem('email', email)
    console.log('===', email) 
    const res = await forgotPassword(email)

    if(res.status === 200){
      navigate('/verify')
    }
  }

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
            Vui lòng kiểm tra email để thay doi mat khau 
          </p>
          <p className="form-title">Quen mat khau</p>
          <div className="row-form-field">
            <label>Nhap email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            ></input>
          </div>
          <div className="row-form">
            <button>Xác nhan</button>
          </div>
        </form>
      </div>
    </div>
  );
 }

export default ForgotPassword
