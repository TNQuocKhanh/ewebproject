import { useState } from "react";
import { updateAddress, createAddress } from "../apis";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Toastify from "../components/product/Toastify";
import { toast } from "react-toastify";

export const ProfileAddress = (props) => {
  const { address } = props;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(true);
  const [idAddress, setIdAddress] = useState();

  const handleEdit = (it) => {
    setOpen(true);
    setIdAddress(it.id);
    setName(it.name);
    setDistrict(it.district);
    setPhoneNumber(it.phoneNumber);
    setStreet(it.street);
    setDefaultAddress(it.defaultAddress);
  };

  const handleAdd = () => {
    setOpen(true);
    setIdAddress(null);
    setName("");
    setDistrict("");
    setPhoneNumber("");
    setStreet("");
    setDefaultAddress(false);
  };

  const handleSubmit = async () => {
    try {
      if (idAddress) {
        await updateAddress(idAddress, {
          name,
          district,
          phoneNumber,
          street,
          defaultAddress,
        });
        toast.success("Cập nhật thành công");
      } else {
        await createAddress({
          name,
          district,
          phoneNumber,
          street,
          defaultAddress,
        });
        toast.success("Thêm mới thành công");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra");
      console.log("[create or update address] Error]", err);
    }
    setOpen(false);
  };

  return (
    <div>
      {address.map((it, idx) => {
        return (
          <Card key={idx} sx={{ maxWidth: 600, marginBottom: 2 }} variant="outlined">
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
          <Button onClick={handleSubmit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Toastify />
    </div>
  );
};
