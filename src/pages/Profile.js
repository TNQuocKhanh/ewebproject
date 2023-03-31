import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getProfile, updatePhoto, updateProfile } from "../apis";
import "../styles/partials/pages/_profile.scss";
import { storage } from "../utils";
import { AiOutlineUpload } from "react-icons/ai";

const Profile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [photo, setPhoto] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const getUserProfile = async () => {
    const res = await getProfile();
    setName(res.fullName);
    setEmail(res.email);
    setPhoneNumber(res.phoneNumber);
    setPhoto(res.photos);
  };

  useEffect(() => {
    if (storage.load("user")) {
      getUserProfile();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateProfile({ fullName: name });
    } catch (e) {
      console.log("====Update profile error", e);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPhoto(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    console.log("===objectUrl", objectUrl);
    try {
      updatePhoto(selectedFile);
      console.log("===Upload image successfully!");
    } catch {
      console.log("===Error upload image");
    }
    setPhoto(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <Header />
      <div id="page-profile" className="container">
        <div className="box-img">
          <img
            src={photo}
            alt=""
            style={{ border: "1px solid #bbbbbb", borderRadius: "50%" }}
            width="200px"
            height="200px"
          />
          <h4 style={{ padding: "20px 0 10px 0" }}>{name}</h4>
          <small style={{ padding: "0px 0 20px 0" }}>{email}</small>
          <div className="btn-upload-img">
            <label
              htmlFor="input-upload"
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #cccccc",
              }}
            >
              <AiOutlineUpload
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />
              Tải ảnh mới
            </label>
            <input
              hidden
              id="input-upload"
              type="file"
              onChange={onSelectFile}
            />
          </div>
        </div>
        <div className="box-form-profile">
          <form className="form-profile" onSubmit={handleSubmit}>
            <p className="form-title">Thông tin người dùng</p>
            <div className="row-form-field">
              <label>Tên người dùng</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="row-form-field">
              <label>Email</label>
              <input
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="row-form-field">
              <label>Số điện thoại</label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="row-form-field">
              <label>Địa chỉ giao hàng</label>
              <select>
                <option>Số 1, Võ Văn Ngân</option>
              </select>
            </div>
            <div className="row-form">
              <button type="submit">Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
// Change address to select input
export default Profile;
