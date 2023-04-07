import { useEffect, useState } from "react";
import { Card, Tab, Tabs, Grid, Typography } from "@mui/material";
import { getListOrders } from "../apis";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { TabPanel } from "../components/common/TabPanel";

const OrderTab = (props) => {
  const { data } = props;
  return (
    <div>
      {data.map((it) => {
        return (
          <Card sx={{ maxWidth: 600, marginBottom: 2 }} variant="outlined">
            <Grid container>
              <Grid item md={10} xs={10}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Tong tien: {it.total}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  SDT: {it.phoneNumber}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Chi tiet: {it.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  {`${it.street}, ${it.district}`}
                </Typography>
                <Typography variant="body1">
                Ngay dat hang: {it.orderTime}
                </Typography>
                <Typography variant="body1">
               Phuong thuc: {it.paymentMethod}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </div>
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
        className="container"
        style={{
          margin: "13rem auto 0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Chờ xác nhận" />
          <Tab label="Chờ lấy hàng" />
          <Tab label="Đang giao" />
          <Tab label="Đã giao" />
          <Tab label="Đã huỷ" />
          <Tab label="Trả hàng" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <OrderTab data={orders.filter((v) => v.status === "NEW")} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Cho lay hang
        </TabPanel>
        <TabPanel value={value} index={2}>
          Dang giao
        </TabPanel>
        <TabPanel value={value} index={3}>
          <OrderTab data={orders.filter((v) => v.status === "DELIVERED")} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          Da giao
        </TabPanel>
        <TabPanel value={value} index={5}>
          Tra hang
        </TabPanel>
      </div>
      <Footer />
    </>
  );
};
