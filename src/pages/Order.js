import { useEffect, useState } from "react";
import { Card, Tab, Tabs, Grid, Typography, Button } from "@mui/material";
import { cancelOrder, getListOrders } from "../apis";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { TabPanel } from "../components/common/TabPanel";
import { formatDateTime, formatPrice, getStatus } from "../utils";
import useDocTitle from "../hooks/useDocTitle";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { Loading } from "../components/common/Loading";
import Toastify from "../components/product/Toastify";
import { toast } from "react-toastify";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const OrderTab = (props) => {
  const { data = [], canCancel = false } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [orderId, setOrderId] = useState();

  const handleOpenDialog = (it) => {
    setOpenDialog(true);
    setOrderId(it.id);
  };

  const handleCancelOrder = async (id) => {
    try {
      await cancelOrder(id);
      toast.success("Huỷ đơn hàng thành công");
    } catch (err) {
      console.log("[Cancel order] Error", err);
    }
    setOpenDialog(false);
  };

  return (
    <>
      {data.length > 0 ? (
        <div>
          {data.map((it) => {
            return (
              <Card
                sx={{ minWidth: 700, marginBottom: 2, padding: 2 }}
                variant="outlined"
              >
                <Grid container>
                  <Grid item md={12} xs={12}>
                    {it.orderDetails.map((v) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <img src={v.productImage} alt="img" width="70px" />
                            <div style={{ marginLeft: 10 }}>
                              <p>{v.productName || "abc"}</p>
                              <p>x {v.quantity}</p>
                            </div>
                          </div>
                          <Typography>{formatPrice(v.productPrice)}</Typography>
                        </div>
                      );
                    })}
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Thành tiền: {formatPrice(it.total)}
                    </Typography>
                    <hr />
                    <div>Thông tin đặt hàng:</div>
                    <Typography color="text.secondary">
                      Số điện thoại: {it.phoneNumber}
                    </Typography>
                    <Typography color="text.secondary">
                      Địa chỉ: {`${it.street}, ${it.district}`}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Phương thức thanh toán: {it.paymentMethod}
                    </Typography>
                    <Typography variant="caption" sx={{ float: "right" }}>
                      Ngày đặt hàng: {formatDateTime(it.orderTime)}
                    </Typography>
                    {canCancel && (
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenDialog(it)}
                      >
                        Huỷ
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>
            );
          })}
          <ConfirmDialog
            open={openDialog}
            message={"Bạn có chắc chắn muốn huỷ đơn hàng này?"}
            handleClose={() => setOpenDialog(false)}
            handleClick={() => handleCancelOrder(orderId)}
          />
        </div>
      ) : (
        <Typography color="text.secondary">Không có đơn hàng nào</Typography>
      )}
      <Toastify />
    </>
  );
};

export const Order = () => {
  useDocTitle("Đơn hàng");

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [orders, setOrders] = useState([]);

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await getListOrders();
      setOrders(res);
    } catch (err) {
      console.log("[Get list order] Error", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <Breadcrumbs />
      {isSmall ? (
        <div>
          {orders.map((it) => (
            <Card
              sx={{ minWidth: 400, marginBottom: 2, padding: 1 }}
              variant="outlined"
            >
              <Grid container>
                <Grid item md={12} xs={12}>
                  {it.orderDetails.map((v) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <img src={v.productImage} alt="img" width="70px" />
                        <div style={{ marginLeft: 10 }}>
                          <p>{v.productName || "abc"}</p>
                          <p>x {v.quantity}</p>
                        </div>
                        <Typography>{formatPrice(v.productPrice)}</Typography>
                      </div>
                    );
                  })}
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Thành tiền: {formatPrice(it.total)}
                  </Typography>
                  <hr />
                  <div>Thông tin đặt hàng:</div>
                  <Typography color="text.secondary">
                    Số điện thoại: {it.phoneNumber}
                  </Typography>
                  <Typography color="text.secondary">
                    Địa chỉ: {`${it.street}, ${it.district}`}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Phương thức thanh toán: {it.paymentMethod}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Trạng thái: {getStatus(it.status).text}
                  </Typography>
                  <Typography variant="caption" sx={{ float: "right" }}>
                    Ngày đặt hàng: {formatDateTime(it.orderTime)}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          ))}
        </div>
      ) : (
        <div
          id="page-profile"
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Chờ xác nhận" />
            <Tab label="Đã thanh toán" />
            <Tab label="Đang xử lý" />
            <Tab label="Đang vận chuyển" />
            <Tab label="Đã giao" />
            <Tab label="Trả hàng" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <OrderTab
              data={orders.filter((v) => v.status === "NEW")}
              canCancel={true}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderTab data={orders.filter((v) => v.status === "PAID")} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <OrderTab
              data={orders.filter(
                (v) => v.status === "PROCESSING" || v.status === "PACKAGED"
              )}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <OrderTab data={orders.filter((v) => v.status === "SHIPPING")} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <OrderTab data={orders.filter((v) => v.status === "DELIVERED")} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <OrderTab data={orders.filter((v) => v.status === "RETURNED")} />
          </TabPanel>
        </div>
      )}
      <Footer />
    </>
  );
};
