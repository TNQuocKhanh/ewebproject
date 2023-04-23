import { useEffect, useState } from "react";
import { Card, Tab, Tabs, Grid, Typography } from "@mui/material";
import { getListOrders } from "../apis";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { TabPanel } from "../components/common/TabPanel";
import { formatDateTime } from "../utils";
import Messenger from "../components/common/Messenger";

const OrderTab = (props) => {
  const { data = [] } = props;

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
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyGYdKSbNljYxeVeFr8h8r0quDTV24v4FAA&usqp=CAU"
                              alt="img"
                              width="70px"
                            />
                            <div style={{ marginLeft: 10 }}>
                              <p>Ten: Ten san pham</p>
                              <p>x 5</p>
                            </div>
                          </div>
                          <Typography>100.000 đ</Typography>
                        </div>
                      );
                    })}
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Thành tiền: {it.total}
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
                  </Grid>
                </Grid>
              </Card>
            );
          })}
        </div>
      ) : (
        <Typography color="text.secondary">Không có đơn hàng nào</Typography>
      )}
    </>
  );
};

export const Order = () => {
  const [orders, setOrders] = useState([]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllOrders = async () => {
    const res = await getListOrders();
    setOrders(res);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <Header />
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
          <OrderTab data={orders.filter((v) => v.status === "NEW")} />
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
      <Messenger/>
      <Footer />
    </>
  );
};
