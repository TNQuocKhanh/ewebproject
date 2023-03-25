import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getProfile } from "../apis";
import "../styles/partials/pages/_profile.scss";
import { storage } from "../utils";
import { AiOutlineUpload } from "react-icons/ai";

const Profile = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [photo, setPhoto] = useState()

  const getUserProfile = async () => {
    const res = await getProfile();
    setName(res.fullName)
    setEmail(res.email)
    setPhoneNumber(res.phoneNumber)
    setPhoto(res.photo)
  };

  useEffect(() => {
    if (storage.load("user")) {
      getUserProfile();
    }
  }, []);

  return (
    <>
      <Header />
      <div id="page-profile" className="container">
        <div className="box-img">
          <img src='https://galaxylands.com.vn/wp-content/uploads/2022/10/tieu-su-ca-si-mono-17.jpg' alt="" style={{ border: '1px solid #bbbbbb', borderRadius: '50%' }} width="200px" height="200px" />
          <h4 style={{ padding: '20px 0 10px 0' }}>Tran Nguyen Quoc Khanh</h4>
          <small style={{ padding: '0px 0 20px 0' }}>19110227@student.hcmute.edu.vn</small>
          <div className="btn-upload-img">
            <label htmlFor="input-upload" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', padding: '10px', borderRadius: '5px', border: '1px solid #cccccc' }}>
              <AiOutlineUpload style={{ fontSize: '1.3rem', marginRight: '5px' }} />
              Tải ảnh mới
            </label>
            <input hidden id="input-upload" type="file" />
          </div>
        </div>
        <div className="box-form-profile">
          <form className="form-profile">
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
              {/* <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
              ></input> */}
              <select>
                <option>
                  Số 1, Võ Văn Ngân
                </option>
              </select>
            </div>
            <div className="row-form">
              <button>Cập nhật</button>
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
