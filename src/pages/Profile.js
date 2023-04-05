import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {
  createAddress,
  getProfile,
  updateAddress,
  updatePhoto,
  updateProfile,
} from "../apis";
import "../styles/partials/pages/_profile.scss";
import { storage } from "../utils";
import { AiOutlineUpload } from "react-icons/ai";
import { TabPanel } from "../components/common/TabPanel";
import {
  Card,
  Tabs,
  Tab,
  Grid,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ProfileInfo = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [createdTime, setCreatedTime] = useState();
  const [photo, setPhoto] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const getUserProfile = async () => {
    const res = await getProfile();
    setName(res.fullName);
    setEmail(res.email);
    setCreatedTime(res.createdTime);
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
    try {
      await updatePhoto(selectedFile);
    } catch (err) {
      console.log("====Upload image error");
    }
  };

  return (
    <>
      <Grid container>
        <Grid item md={6} xs={12}>
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
                {selectedFile ? (
                  <button onClick={handleUploadImage}>Upload</button>
                ) : (
                  <>
                    <AiOutlineUpload
                      style={{ fontSize: "1.3rem", marginRight: "5px" }}
                    />
                    Tải ảnh mới
                  </>
                )}
              </label>
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
                <label>Ngày tạo</label>
                <input
                  value={createdTime}
                  disabled
                  onChange={(e) => setCreatedTime(e.target.value)}
                  type="text"
                ></input>
              </div>
              <div className="row-form">
                <button type="submit">Cập nhật</button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

const ProfileAddress = (props) => {
  const { address } = props;

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");

  const [idAddress, setIdAddress] = useState();

  const handleEdit = (it) => {
    setOpen(true);
    setIdAddress(it.id);
    setName(it.name);
    setDistrict(it.district);
    setPhoneNumber(it.phoneNumber);
    setStreet(it.street);
  };

  const handleAdd = () => {
    setOpen(true);
    setIdAddress(null);
    setName("");
    setDistrict("");
    setPhoneNumber("");
    setStreet("");
  };

  const handleSubmit = async () => {
    if (idAddress) {
      try {
        await updateAddress(idAddress, { name, district, phoneNumber, street });
      } catch (err) {
        console.log("===Error", err);
      }
    } else {
      try {
        await createAddress({ name, district, phoneNumber, street });
      } catch (err) {
        console.log("===Error", err);
      }
    }
    setOpen(false);
  };

  return (
    <div>
      {address.map((it) => {
        return (
          <Card sx={{ maxWidth: 600, marginBottom: 2 }} variant="outlined">
            <Grid container>
              <Grid item md={10} xs={10}>
                <CardContent>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {it.name} | {it.phoneNumber}
                  </Typography>
                  <Typography variant="body1">
                    {`${it.street}, ${it.district}`}
                  </Typography>
                  <Typography variant="body1">
                    {it.defaultAddress && (
                      <Chip sx={{ mt: 1 }} label="Mặc định" />
                    )}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item md={2} xs={2}>
                <div
                  style={{
                    position: "relative",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <Tooltip title="Cập nhật" onClick={() => handleEdit(it)}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
            </Grid>
          </Card>
        );
      })}
      <Tooltip title="Thêm địa chỉ mới" onClick={handleAdd}>
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{idAddress ? "Cập nhật" : "Thêm mới"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Quận"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Tên đường"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Huỷ
          </Button>
          <Button onClick={handleSubmit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Profile = () => {
  const [value, setValue] = useState(0);
  const [address, setAddress] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUserProfile = async () => {
    const res = await getProfile();
    setAddress(res.address);
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
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Thông tin" />
          <Tab label="Địa chỉ" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProfileInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <ProfileAddress address={address} />
            </Grid>
          </Grid>
        </TabPanel>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
