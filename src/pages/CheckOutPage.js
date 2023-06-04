import React, { useContext, useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../styles/partials/pages/_checkout.scss";
import { FaCheckCircle } from "react-icons/fa";
import cartContext from "../contexts/cart/cartContext";
import {
  checkVoucher,
  createOrder,
  createPayment,
  getProfile,
  getServices,
  getShippingFee,
  getVouchers,
} from "../apis";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils";
import { ProfileAddress } from "./Address";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import useDocTitle from "../hooks/useDocTitle";
import Toastify from "../components/product/Toastify";
import { toast } from "react-toastify";
import Breadcrumbs from "../components/common/Breadcrumbs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const CheckOutPage = () => {
  useDocTitle("Thanh toán");

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const [method, setMethod] = useState(1);
  const [address, setAddress] = useState();
  const [note, setNote] = useState();
  const [lineItem, setLineItem] = useState();

  const [valueAddress, setValueAddress] = useState();
  const [vouchers, setVouchers] = useState([]);

  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState();

  const [voucherCode, setVoucherCode] = useState("");
  const [messageVoucher, setMessageVoucher] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState("");

  const [loading, setLoading] = useState(false);

  const { cart } = useContext(cartContext);

  const cartDiscount = cart.map((item) => {
    return (item.price - item.discountPrice) * item.amount;
  });

  const calculateCartDiscount = cartDiscount.reduce(
    (accum, val) => accum + val,
    0
  );

  const getUserProfile = async () => {
    const res = await getProfile();
    setAddress(res.shippingAddresses);
  };

  const fetchVouchers = async () => {
    try {
      const res = await getVouchers();
      setVouchers(res);
    } catch (err) {
      console.log("[fetchVouchers] error", err);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const getAllService = async () => {
    const { data = [] } = await getServices(valueAddress?.districtId);
    setServices(data);
  };

  useEffect(() => {
    getUserProfile();
    if (valueAddress?.districtId) {
      getAllService();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueAddress?.districtId]);

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.discountPrice * cur.amount,
    0
  );

  const totalShipping =
    lineItem &&
    lineItem.length > 0 &&
    lineItem.reduce((acc, cur) => acc + cur.shippingFee * cur.quantity, 0);

  const handleCheckout = async () => {
    const value = {
      shippingAddress: {
        receiver: valueAddress.name,
        phoneNumber: valueAddress.phoneNumber,
        districtId: valueAddress.districtId,
        district: valueAddress.district,
        wardCode: valueAddress.wardCode,
        ward: valueAddress.ward,
        street: valueAddress.street,
      },
      paymentMethod: method === 1 ? "COD" : "VNPAY",
      totalPrice: totalPrice + totalShipping - voucherDiscount,
      lineItem: lineItem,
      note,
      voucherCode,
      voucherDiscount,
    };

    setLoading(true);
    if (method === 1) {
      const res = await createOrder(value);
      if (res.status === 201) {
        toast.success("Đặt hàng thành công");
        localStorage.removeItem("myCart");
        setTimeout(() => window.location.replace("/"), 2000);
      } else {
        console.log("[Create order] error", res);
        toast.error("Có lỗi xảy ra");
      }
    } else {
      const res = await createPayment({ totalPrice: value.totalPrice });
      localStorage.setItem("order", JSON.stringify(value));
      if (res.status === 200) {
        const url = await res.json();
        window.location.replace(url.url);
      }
    }
    setLoading(false);
  };

  const handleCheckVoucher = async () => {
    const res = await checkVoucher({
      voucherCode,
      totalPrice,
    });
    if (res.id) {
      setVoucherDiscount(res.voucherDiscount);
      setMessageVoucher("Áp dụng mã giảm giá thành công");
    } else if (res.code === "08") {
      setMessageVoucher("Đơn hàng chưa đạt giá trị tối thiểu");
    } else if (res.code === "01") {
      setMessageVoucher("Không tìm thấy mã giảm giá");
    } else if (res.code === "02") {
      setMessageVoucher("Mã giảm giá chưa bắt đầu");
    } else if (res.code === "05") {
      setMessageVoucher("Mã giảm giá đã hết hạn");
    } else if (res.code === "10") {
      setMessageVoucher("Mã giảm giá đã được sử dụng");
    } else {
      setMessageVoucher("");
    }
  };

  const calculateShipping = async () => {
    const items = [];
    try {
      const getFee = async (val) => {
        try {
          if (val.service_id) {
            const { data: res } = await getShippingFee(val);
            return res;
          }
        } catch (err) {
          console.log(err);
        }
      };

      const cartNew = await Promise.all(
        cart.map((v) => {
          return getFee({
            service_id: serviceId,
            insurance_value: 5000000,
            from_district_id: 3695,
            to_district_id: valueAddress?.districtId,
            to_ward_code: valueAddress?.wardCode,
            height: v.height,
            length: v.length,
            weight: v.weight,
            width: v.width,
          });
        })
      );
      cart.forEach((it, idx) => {
        items.push({
          productId: it.id,
          quantity: it.amount,
          productPrice: it.discountPrice,
          shippingFee: cartNew[idx]?.total,
        });
      });
      setLineItem(items);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    calculateShipping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  return (
    <>
      <Header />
      <Breadcrumbs />
      <Toastify />
      <section id="checkout" className="container">
        <div
          className="box-form-checkout"
          style={isSmall ? { width: "100%" } : {}}
        >
          <h4>1. Phương thức thanh toán (*)</h4>
          <div className="payment-method">
            <button
              style={{ border: method === 1 && "1px solid rgb(0, 0, 186)" }}
              onClick={() => setMethod(1)}
            >
              <strong>Thanh toán khi nhận hàng</strong>
              <div>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/004/309/804/original/stack-bills-money-cash-isolated-icon-free-vector.jpg"
                  alt="cash-logo"
                  width="100px"
                  height="50px"
                />
              </div>
              <div className="check-payment-method">
                {method === 1 && <FaCheckCircle />}
              </div>
            </button>
            <button
              style={{ border: method === 2 && "1px solid rgb(0, 0, 186)" }}
              onClick={() => setMethod(2)}
            >
              <strong>
                Thanh toán VNPay
                <div style={{ mt: "10px" }}>
                  <img
                    src="https://cdn.nhanlucnganhluat.vn/uploads/images/A73E9E13/logo/2020-03/19222904_308450352935921_8689351082334351995_o.jpg"
                    alt="VNPAY-logo"
                    width="100px"
                    height="100px"
                  />
                </div>
              </strong>
              <div className="check-payment-method">
                {method === 2 && <FaCheckCircle />}
              </div>
            </button>
          </div>
          <h4>2. Thông tin giao hàng (*)</h4>
          <ProfileAddress
            address={address}
            canChoose={true}
            setValueAddress={setValueAddress}
            onRefresh={async () => {
              await getUserProfile();
            }}
          />
          <FormControl>
            <h4 style={{ margin: "10px 0" }}>3. Phương thức giao hàng (*)</h4>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {services &&
                services.map((it, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={it.service_id}
                    control={<Radio />}
                    label={it.short_name}
                    onChange={(e) => setServiceId(e.target.value)}
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <h4 style={{ marginTop: "20px" }}>4. Ghi chú</h4>
          <textarea
            placeholder="Ghi chú cho người bán"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              border: "1px solid #cccccc",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "15px",
              width: "100%",
            }}
          />
        </div>
        <div
          className="box-item-checkout"
          style={isSmall ? { width: "100%" } : {}}
        >
          <h4>5. Mã giảm giá</h4>
          <div style={{ margin: "20px 0" }}>
            <Grid container sx={{ display: "flex", alignItems: "center" }}>
              <Grid item md={9} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Chọn mã giảm giá
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={voucherCode}
                    label="Chọn mã giảm giá"
                    onChange={(e) => setVoucherCode(e.target.value)}
                  >
                    {vouchers.map((item) => (
                      <MenuItem key={item.id} value={item.voucherCode}>
                        {item.name} - Giảm {formatPrice(item.voucherDiscount)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={3} xs={12}>
                <Button
                  sx={{ float: "right" }}
                  variant="outlined"
                  onClick={handleCheckVoucher}
                >
                  Áp dụng
                </Button>
              </Grid>
              <Typography
                variant="caption"
                sx={{ color: "red", fontStyle: "italic" }}
              >
                {messageVoucher}
              </Typography>
            </Grid>
          </div>
          <h4>Thông tin đơn hàng</h4>
          <div className="check-item">
            {cart.map((it, idx) => {
              return (
                <div key={idx}>
                  <div className="row-item-cart">
                    <div style={{ display: "flex" }}>
                      <img src={it.mainImage} alt="product-img"></img>
                      <div style={{ marginLeft: "20px" }}>
                        <p style={{ paddingBottom: "10px", fontSize: "13px" }}>
                          Tên: {it.name} <br />
                        </p>
                        <p style={{ fontSize: "13px" }}>x {it.amount}</p>
                      </div>
                    </div>
                    <strong style={{ fontSize: "13px" }}>
                      {formatPrice(it.amount * it.discountPrice)}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="total-price">
            <div className="row-total-price">
              <strong>Tổng tạm tính:</strong>
              <p style={{ fontSize: "20px", color: "red" }}>
                {formatPrice(totalPrice)}
              </p>
            </div>
            <div className="row-total-price">
              <strong>Giảm giá:</strong>
              <p style={{ fontSize: "20px", color: "red" }}>
                {formatPrice(calculateCartDiscount)}
              </p>
            </div>
            <div className="row-total-price">
              <strong>Voucher:</strong>
              <p style={{ fontSize: "20px", color: "red" }}>
                {formatPrice(voucherDiscount)}
              </p>
            </div>
            {serviceId && (
              <>
                <div className="row-total-price">
                  <strong>Phí vận chuyển:</strong>
                  <p style={{ fontSize: "20px", color: "red" }}>
                    {formatPrice(totalShipping)}
                  </p>
                </div>
                <div className="row-total-price">
                  <strong>Thành tiền:</strong>
                  <p style={{ fontSize: "25px", color: "red" }}>
                    {formatPrice(
                      totalPrice +
                        totalShipping -
                        calculateCartDiscount -
                        voucherDiscount
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <Button
              onClick={handleCheckout}
              disabled={!valueAddress?.districtId || !serviceId}
              sx={{
                bgcolor:
                  !valueAddress?.districtId || !serviceId
                    ? "#f7e59e"
                    : "#f4c24b",
                width: "100%",
                padding: "15px",
                color: "#fff",
                borderRadius: "5px",
                fontWeight: "600",
                ":hover": {
                  bgcolor: "#ff0000cc",
                },
              }}
            >
              Thanh toán
            </Button>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CheckOutPage;
