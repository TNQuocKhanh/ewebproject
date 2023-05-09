import { useState, useEffect, useContext } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getProfile, updatePhoto, updateProfile } from "../apis";
import "../styles/partials/pages/_profile.scss";
import { formatDateTime, storage } from "../utils";
import { AiOutlineUpload } from "react-icons/ai";
import { TabPanel } from "../components/common/TabPanel";
import { Tabs, Tab, Grid, CircularProgress } from "@mui/material";
import { ProfileAddress } from "./Address";
import { toast } from "react-toastify";
import Toastify from "../components/product/Toastify";
import commonContext from "../contexts/common/commonContext";
import Messenger from "../components/common/Messenger";
import useDocTitle from "../hooks/useDocTitle";
import { ProfileLoading } from "../components/common/Loading";

const ProfileInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [provider, setProvider] = useState("");

  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const getUserProfile = async () => {
    setLoading(true);
    const res = await getProfile();
    setName(res.fullName);
    setEmail(res.email);
    setCreatedTime(res.createdTime);
    setPhoto(res.photos);
    setProvider(res.provider);
    setLoading(false);
  };

  useEffect(() => {
    if (storage.load("user")) {
      getUserProfile();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await updateProfile({ fullName: name });
      toast.success("Cập nhật thành công");
    } catch (e) {
      toast.error("Đã có lỗi xảy ra");
      console.log("[Update profile] Error", e);
    }
    setUpdateLoading(false);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPhoto(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
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

  const handleUploadImage = async () => {
    setImgLoading(true);
    try {
      await updatePhoto(selectedFile);
      toast.success("Cập nhật thành công");
    } catch (err) {
      toast.error("Đã có lỗi xảy ra");
      console.log("[Upload image] Error");
    }
    setImgLoading(false);
  };

  if (loading) return <ProfileLoading />;
  if (imgLoading) return <ProfileLoading />;

  return (
    <>
      <Grid container>
        <Grid item md={6} xs={12}>
          <div className="box-img">
            <img
              src={photo}
              alt=""
              style={{
                border: "1px solid #bbbbbb",
                borderRadius: "50%",
                objectFit: "contain",
              }}
              width="200px"
              height="200px"
            />
            <h4 style={{ padding: "20px 0 10px 0" }}>{name}</h4>
            <small style={{ padding: "0px 0 20px 0" }}>{email}</small>
            <div className="btn-upload-img">
              {provider === "local" && (
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
                  {selectedFile ? (
                    <button onClick={handleUploadImage}>Tải ảnh lên</button>
                  ) : (
                    <>
                      <AiOutlineUpload
                        style={{ fontSize: "1.3rem", marginRight: "5px" }}
                      />
                      Chọn ảnh
                    </>
                  )}
                </label>
              )}
              <input
                hidden
                id="input-upload"
                type="file"
                onChange={onSelectFile}
              />
            </div>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="box-form-profile">
            <form className="form-profile" onSubmit={handleSubmit}>
              <p className="form-title">Thông tin người dùng</p>
              <div className="row-form-field">
                <label>Tên người dùng</label>
                <input
                  style={{
                    cursor: provider !== "local" ? "not-allowed" : "auto",
                  }}
                  value={name}
                  disabled={provider !== "local"}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                ></input>
              </div>
              <div className="row-form-field">
                <label>Email</label>
                <input
                  style={{
                    cursor: provider !== "local" ? "not-allowed" : "auto",
                  }}
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                ></input>
              </div>
              <div className="row-form-field">
                <label>Ngày tạo</label>
                <input
                  style={{
                    cursor: provider !== "local" ? "not-allowed" : "auto",
                  }}
                  value={formatDateTime(createdTime)}
                  disabled
                  onChange={(e) => setCreatedTime(e.target.value)}
                  type="text"
                ></input>
              </div>
              {provider === "local" && (
                <>
                  {updateLoading ? (
                    <div style={{ textAlign: "center" }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <div className="row-form">
                      <button type="submit">Cập nhật</button>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
      <Toastify />
    </>
  );
};

const Profile = () => {
  useDocTitle("Thông tin người dùng");
  const { profile = [] } = useContext(commonContext);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />

      <div id="page-profile" className="container">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Thông tin" />
          <Tab label="Địa chỉ" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProfileInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <ProfileAddress address={profile.shippingAddresses} />
            </Grid>
          </Grid>
        </TabPanel>
      </div>
      <Messenger />
      <Footer />
    </>
  );
};

export default Profile;
