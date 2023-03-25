import {useState, useEffect} from "react";
import { FaArrowLeft } from "react-icons/fa";
import { getProfile } from "../apis";
import { storage } from "../utils";

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
    <div id="page-register">
      <div className="back-to-home">
        <a href="/">
          <FaArrowLeft />
        </a>
      </div>
      <div className="box-img-login-page">
        <img src={photo} alt="" style={{ border: '1px solid #000' }} width="200px" height="100px"  />
        <input type="file" />
      </div>
      <div className="box-form-login-page">
        <form className="form-login">
          <p className="form-title">Thogn tin nguoi dung</p>
          <div className="row-form-field">
            <label>Ten</label>
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
            <label>Phone</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
            ></input>
          </div>
          <div className="row-form-field">
            <label>Address</label>
            <input
              value={phoneNumber}
              onChange={(e) =>setPhoneNumber(e.target.value)}
              type="text"
            ></input>
          </div>
          <div className="row-form">
            <button>Cap nhat</button>
          </div>
        </form>
      </div>
    </div>
  );
};
// Change address to select input
export default Profile;
