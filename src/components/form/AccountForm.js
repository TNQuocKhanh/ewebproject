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

  return (
    <>
      {isFormOpen && (
        <div className="backdrop">
          <div className="modal_centered">
            <form id="account_form" ref={formRef} onSubmit={handleLogin}>
              <div className="form_head">
                <h2>{isSignupVisible ? "Đăng ký" : "Đăng nhập"}</h2>
                <p>
                  {isSignupVisible
                    ? "Bạn đã có tài khoản ?"
                    : "Bạn chưa có tài khoản ?"}
                  &nbsp;&nbsp;
                  <button type="button" onClick={handleIsSignupVisible}>
                    {isSignupVisible ? "Đăng nhập" : "Đăng ký ngay"}
                  </button>
                  <p>{message}</p>
                </p>
              </div>

              <div className="form_body">
                {isSignupVisible && (
                  <div className="input_box">
                    <input
                      type="text"
                      name="username"
                      className="input_field"
                      value={inputValues.username || ""}
                      onChange={handleInputValues}
                      required
                    />
                    <label className="input_label">Tên người dùng</label>
                  </div>
                )}

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

                {isSignupVisible && (
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
                )}

                <button type="submit" className="btn login_btn">
                  {isSignupVisible ? "Đăng ký" : "Đăng nhập"}
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountForm;
