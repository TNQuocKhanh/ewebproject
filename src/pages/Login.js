import React, { useState } from 'react'
import '../styles/partials/pages/_login.scss'
import {FaArrowLeft} from 'react-icons/fa'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <div id='page-login'>
            <div className='back-to-home'>
                <a href='/'>
                    <FaArrowLeft />
                </a>
            </div>
            <div className='box-img-login-page'>
                <div>
                    <h2>Chào mừng bạn đến với HDK Shop</h2>
                </div>
                <img src='https://global-uploads.webflow.com/5fd1e27d738df312147555e1/5ffcc4982f5eb04582ea5200_Mask%20Group.svg'></img>
            </div>
            <div className='box-form-login-page'>
                <form className='form-login'>
                    <p className='form-title'>Đăng nhập</p>
                    <div className='row-form-field'>
                        <label>Email</label>
                        <input type='email' placeholder='Nhập email'></input>
                    </div>
                    <div className='row-form-field'>
                        <label>Mật khẩu</label>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Nhập mật khẩu'></input>
                    </div>
                    <div className='row-form'>
                        <input onClick={handleClickShowPassword} type='checkbox'></input>
                        <label>Hiển thị mật khẩu</label>
                    </div>
                    <div className='row-form'>
                        <button>Đăng nhập</button>
                    </div>
                    <div className='row-form'>
                        <p>Hoặc</p>
                    </div>
                    <div className='row-form-google'>
                        <button>
                            <img src='https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png'></img>
                            Đăng nhập với Google
                        </button>
                    </div>
                    <div className='row-form'>
                        <a className='form-link' href='#'>Quên mật khẩu?</a>
                    </div>
                    <div className='row-form'>
                        <span>
                            Chưa có tài khoản?
                            <a className='form-link' href='/register'>
                                Đăng ký
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login