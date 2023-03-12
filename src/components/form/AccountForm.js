import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import commonContext from "../../contexts/common/commonContext";
import useForm from "../../hooks/useForm";
import useOutsideClose from "../../hooks/useOutsideClose";
import useScrollDisable from "../../hooks/useScrollDisable";
import {login} from '../../apis'
import {storage} from '../../utils'

const AccountForm = () => {
  const { isFormOpen, toggleForm } = useContext(commonContext);
  const { inputValues, handleInputValues, handleFormSubmit } = useForm();

  const [message, setMessage] =useState('')

  const formRef = useRef();

  useOutsideClose(formRef, () => {
    toggleForm(false);
  });

  useScrollDisable(isFormOpen);

  const [isSignupVisible, setIsSignupVisible] = useState(false);

  // Signup-form visibility toggling
  const handleIsSignupVisible = () => {
    setIsSignupVisible((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('==', inputValues)
    const res =await login(inputValues.email, inputValues.password)

    if(res.status ===200){
      const data = await res.json()

      storage.save('user', data)
      console.log('===res', res.json())
      setMessage('')
      toggleForm(false)
    }else{
      setMessage('Thong tin dang nhap ko hop le')
    }
  }
  
  const handleSignUp = async (e) => {
    e.preventDefault()
    console.log('==', inputValues)
    //const res =await login(inputValues.email, inputValues.password)

    //if(res.status ===200){
      //const data = await res.json()

      //storage.save('user', data)
      //console.log('===res', res.json())
      //setMessage('')
      //toggleForm(false)
    //}else{
      //setMessage('Thong tin dang nhap ko hop le')
    //}
  }

  return (
    <>
      {isFormOpen && (
        <div className="backdrop">
        <div className="modal_centered">
        {isSignupVisible ? (
            <form id="account_form" ref={formRef} onSubmit={handleLogin}>
              <div className="form_head">
                <h2>Đăng nhập</h2>
                <p>
                    Bạn chưa có tài khoản ?
                  &nbsp;&nbsp;
                  <button type="button" onClick={handleIsSignupVisible}>
                   Đăng ký ngay
                  </button>
                  <p>{message}</p>
                </p>
              </div>

              <div className="form_body">
                <div className="input_box">
                  <input
                    type="email"
                    name="email"
                    className="input_field"
                    value={inputValues.email || ""}
                    onChange={handleInputValues}
                    required
                  />
                  <label className="input_label">Email</label>
                </div>

                <div className="input_box">
                  <input
                    type="password"
                    name="password"
                    className="input_field"
                    value={inputValues.password || ""}
                    onChange={handleInputValues}
                    required
                  />
                  <label className="input_label">Mật khẩu</label>
                </div>

                <button type="submit" className="btn login_btn">
                  Đăng nhập
                </button>
              </div>

              <div className="form_foot">
                <p>hoặc đăng nhập với</p>
                <div className="login_options">
                  <Link to="/">Facebook</Link>
                  <Link to="/">Google</Link>
                  <Link to="/">Twitter</Link>
                </div>
              </div>

              <div
                className="close_btn"
                title="Đóng"
                onClick={() => toggleForm(false)}
              >
                &times;
              </div>
        </form>) : (
            <form id="account_form" ref={formRef} onSubmit={handleSignUp}>
              <div className="form_head">
                <h2>Đăng ký</h2>
                <p>
                    Bạn đã có tài khoản ?
                  &nbsp;&nbsp;
                  <button type="button" onClick={handleIsSignupVisible}>
                    Đăng nhập
                  </button>
                  <p>{message}</p>
                </p>
              </div>

              <div className="form_body">
                  <div className="input_box">
                    <input
                      type="text"
                      name="fullName"
                      className="input_field"
                      value={inputValues.fullName || ""}
                      onChange={handleInputValues}
                      required
                    />
                    <label className="input_label">Tên người dùng</label>
                  </div>
                <div className="input_box">
                  <input
                    type="email"
                    name="email"
                    className="input_field"
                    value={inputValues.email || ""}
                    onChange={handleInputValues}
                    required
                  />
                  <label className="input_label">Email</label>
                </div>

                <div className="input_box">
                  <input
                    type="password"
                    name="password"
                    className="input_field"
                    value={inputValues.password || ""}
                    onChange={handleInputValues}
                    required
                  />
                  <label className="input_label">Mật khẩu</label>
                </div>
                  <div className="input_box">
                    <input
                      type="password"
                      name="conf_password"
                      className="input_field"
                      value={inputValues.conf_password || ""}
                      onChange={handleInputValues}
                      required
                    />
                    <label className="input_label">Nhập lại mật khẩu</label>
                  </div>
                <button type="submit" className="btn login_btn">
                  Đăng ký
                </button>
              </div>

              <div className="form_foot">
                <p>hoặc đăng nhập với</p>
                <div className="login_options">
                  <Link to="/">Facebook</Link>
                  <Link to="/">Google</Link>
                  <Link to="/">Twitter</Link>
                </div>
              </div>

              <div
                className="close_btn"
                title="Đóng"
                onClick={() => toggleForm(false)}
              >
                &times;
              </div>
            </form>)}
          </div>
        </div>
      )}
    </>
  );
};

export default AccountForm;
