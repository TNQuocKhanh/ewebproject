import React, { useState } from "react";
import "../styles/partials/pages/_login.scss";
import { FaArrowLeft } from "react-icons/fa";
import { createNewPassword } from "../apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toastify from "../components/product/Toastify";
import useDocTitle from "../hooks/useDocTitle";
import { LinearLoading } from "../components/common/Loading";
import { Button, Typography } from "@mui/material";

const resetPasswdBg = "/assets/reset-passwd.png";

const NewPassword = () => {
  useDocTitle("Tạo mới mật khẩu");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [passwdMessage, setPasswdMessage] = useState("");

  const passwdRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/gm;

  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      toast.info("Mật khẩu không trùng khớp");
      return;
    }

    if (!password.match(passwdRegex)) {
      setPasswdMessage(
        "Mật khẩu phải từ 8 đến 20 ký tự, chứa ít nhất 1 chữ số, 1 ký tự hoa và 1 ký tự đặc biệt."
      );
    } else {
      setPasswdMessage("");
      setLoading(true);
      try {
        const res = await createNewPassword(email, password);
        if (res.status === 200) {
          await res.json();
          localStorage.removeItem("email");
          navigate("/login");
        }
      } catch (err) {
        console.log("[Reset password] Error", err);
      }
      setLoading(false);
    }
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
            <Typography
              variant="caption"
              sx={{ color: "red", fontStyle: "italic" }}
            >
              {passwdMessage}
            </Typography>
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
              id="showPasswd"
            ></input>
            <label htmlFor="showPasswd">Hiển thị mật khẩu</label>
          </div>
          <div className="row-form">
            <Button
              type="submit"
              disabled={!password || !rePassword}
              sx={{
                  bgcolor: !password || !rePassword ? "#f7e59e" :  "#f4c24b",
                width: "100%",
                padding: "10px",
                color: "#fff",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#ff0000cc",
                },
              }}
            >
              Lưu mật khẩu
            </Button>
          </div>
        </form>
      </div>
      <Toastify />
    </div>
  );
};

export default NewPassword;
