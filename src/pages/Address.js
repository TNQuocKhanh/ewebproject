import { useEffect, useState } from "react";
import {
  updateAddress,
  createAddress,
  getDistrict,
  getWard,
  deleteAddress,
} from "../apis";
import {
  Card,
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
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Toastify from "../components/product/Toastify";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import AddIcon from "@mui/icons-material/Add";
import { BubbleLoading } from "../components/common/Loading";

export const ProfileAddress = (props) => {
  const { address, canChoose = false, setValueAddress, onRefresh } = props;

  const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(true);
  const [idAddress, setIdAddress] = useState();
  const [districtId, setDistrictId] = useState();
  const [wardId, setWardId] = useState();

  const [districtArr, setDistrictArr] = useState([]);
  const [wardArr, setWardArr] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [idActive, setIdActive] = useState();

  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (refresh) {
      onRefresh();
      setRefresh(false);
    }
  }, [refresh]);

  const handleEdit = (it) => {
    setOpen(true);
    setIdAddress(it.id);
    setName(it.name);
    setWardId(it.wardCode);
    setDistrictId(it.districtId);
    setPhoneNumber(it.phoneNumber);
    setStreet(it.street);
    setDefaultAddress(it.defaultAddress);
    setMessage("");
  };

  const handleAdd = () => {
    setOpen(true);
    setIdAddress(null);
    setName("");
    setWardId(null);
    setDistrictId(null);
    setPhoneNumber("");
    setStreet("");
    setDefaultAddress(false);
    setMessage("");
  };

  const handleSubmit = async () => {
    if (!phoneNumber.match(phoneNumberRegex)) {
      setMessage("Số điện thoại không hợp lệ");
    } else {
      setMessage("");
      const findDistrict = districtArr.find(
        (v) => Number(v.DistrictID) === districtId
      );
      const findWard = wardArr.find(
        (v) => Number(v.WardCode) === Number(wardId)
      );

      const value = {
        name,
        phoneNumber,
        districtId,
        district: findDistrict?.DistrictName || "",
        wardCode: Number(wardId),
        ward: findWard?.WardName || "",
        street,
        defaultAddress,
      };
      setLoading(true);
      try {
        if (idAddress) {
          const res = await updateAddress(idAddress, value);
          if (res) {
            toast.success("Cập nhật thành công");
            setRefresh(true);
          } else {
            toast.error("Có lỗi xảy ra");
          }
        } else {
          const res = await createAddress(value);
          if (res.id) {
            toast.success("Thêm mới thành công");
            setRefresh(true);
          } else {
            toast.error("Có lỗi xảy ra");
          }
        }
      } catch (err) {
        toast.error("Có lỗi xảy ra");
        console.log("[create or update address] Error]", err);
      }
      setOpen(false);
      setLoading(false);
    }
  };

  const getDistrictById = async () => {
    try {
      const res = await getDistrict();
      setDistrictArr(res.data);
    } catch (err) {
      console.log("[Get District Error]", err);
      setDistrictArr([]);
    }
  };

  const getWardById = async (id) => {
    try {
      const res = await getWard(id);
      setWardArr(res.data);
    } catch (err) {
      console.log("[Get Ward Error]", err);
      setWardArr([]);
    }
  };

  useEffect(() => {
    getDistrictById();
    if (districtId) {
      getWardById(districtId);
    }
  }, [districtId]);

  const handleOpenDialog = (it) => {
    setOpenDialog(true);
    setIdDelete(it.id);
  };

  const handleDeleteAddress = async (id) => {
    setLoading(true);
    try {
      const res = await deleteAddress(id);
      console.log("===res", res);
      toast.success("Đã xoá thành công");
      setRefresh(true);
    } catch (err) {
      console.log("[Delete address] Error", err);
      toast.success("Bạn không thể xoá địa chỉ mặc định");
    }
    setOpenDialog(false);
    setLoading(false);
  };

  const handleChoose = (it) => {
    setValueAddress(it);
    setIdActive(it.id);
  };

  if (loading) return <BubbleLoading />;

  return (
    <>
      {canChoose ? (
        <Grid container>
          {address?.map((it, idx) => {
            return (
              <Grid
                key={idx}
                item
                md={6}
                xs={12}
                sx={
                  it.id === idActive
                    ? {
                        padding: "0px",
                        border: "1px solid rgb(0,0,186)",
                        borderRadius: "5px",
                      }
                    : {
                        padding: "0px",
                        border: "1px solid rgba(218, 218, 218, 0.714)",
                        borderRadius: "5px",
                      }
                }
              >
                <CardContent onClick={() => handleChoose(it)}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "5px 0",
                    }}
                  >
                    <strong>{it.name}</strong>
                    <span>
                      <Tooltip title="Cập nhật" onClick={() => handleEdit(it)}>
                        <IconButton>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </div>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Địa chỉ: {`${it.street}, ${it.ward}, ${it.district}`}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Điện thoại: {it.phoneNumber}
                  </Typography>
                </CardContent>
              </Grid>
            );
          })}
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              border: "1px solid rgba(218, 218, 218, 0.714)",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                height: "150px",
                padding: "50px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleAdd}
            >
              <AddIcon />
              <Typography color="text.secondary">Thêm mới </Typography>
            </div>
          </Grid>
        </Grid>
      ) : (
        <div>
          {address?.map((it, idx) => {
            return (
              <Card
                key={idx}
                sx={{ maxWidth: 600, marginBottom: 2 }}
                variant="outlined"
              >
                <Grid container>
                  <Grid item md={10} xs={10}>
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "5px 0",
                        }}
                      >
                        <strong>{it.name}</strong>
                        &nbsp;
                        <span>
                          {it.defaultAddress && <Chip label="Mặc định" />}
                        </span>
                      </div>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Địa chỉ: {`${it.street}, ${it.ward}, ${it.district}`}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Điện thoại: {it.phoneNumber}
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
                      <Tooltip title="Xoá" onClick={() => handleOpenDialog(it)}>
                        <IconButton disabled={it.defaultAddress}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            );
          })}
          <Card
            sx={{ maxWidth: 600, marginBottom: 2, cursor: "pointer" }}
            variant="outlined"
            onClick={handleAdd}
          >
            <Grid container>
              <Grid item md={5} xs={6}>
                <CardContent></CardContent>
              </Grid>
              <Grid item md={7} xs={6}>
                <div
                  style={{
                    position: "relative",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                  }}
                >
                  <AddIcon color="text.secondary" />
                  <Typography color="text.secondary">Thêm mới</Typography>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{idAddress ? "Cập nhật" : "Thêm mới"}</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                margin="dense"
                label="Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                margin="dense"
                required
                label="Số điện thoại"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                type="number"
                fullWidth
                helperText={message}
                sx={{
                  "& .MuiFormHelperText-root": {
                    color: "red",
                  },
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography>Địa chỉ nhận hàng</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tỉnh/Thành phố
                </InputLabel>
                <Select
                  disabled
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={202}
                  label="Tỉnh/Thành phố"
                >
                  <MenuItem value={202}>Tp. Hồ Chí Minh</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={8} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Quận/Huyện
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={districtId}
                  label="Quận/Huyện"
                  onChange={(e) => setDistrictId(e.target.value)}
                >
                  {districtArr.map((item, idx) => (
                    <MenuItem
                      key={idx}
                      value={item.DistrictID}
                      name={item.DistrictName}
                    >
                      {item.DistrictName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={8} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Phường/Xã
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={wardId}
                  disabled={!districtId}
                  label="Phường/Xã"
                  onChange={(e) => setWardId(e.target.value)}
                >
                  {wardArr.map((item, idx) => (
                    <MenuItem key={idx} value={item.WardCode}>
                      {item.WardName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                margin="dense"
                required
                label="Địa chỉ cụ thể"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
          </Grid>
          <FormControlLabel
            label="Đặt làm mặc định"
            control={
              <Checkbox
                label
                checked={defaultAddress}
                value={defaultAddress}
                onChange={() => setDefaultAddress(!defaultAddress)}
              />
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Huỷ
          </Button>
          <Button
            disabled={
              !name || !phoneNumber || !wardId || !districtId || !street
            }
            onClick={handleSubmit}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Toastify />
      <ConfirmDialog
        open={openDialog}
        message={"Bạn có chắc chắn muốn xoá địa chỉ này?"}
        handleClose={() => setOpenDialog(false)}
        handleClick={() => handleDeleteAddress(idDelete)}
      />
    </>
  );
};
