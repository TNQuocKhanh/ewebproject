import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { getListOrders } from "../apis";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export const Order = () => {
  const [orders, setOrders] = useState([]);

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
        {orders.map((it, idx) => {
          return (
            <Card key={idx} variant="outlined">
              <div>{it.orderTime}</div>
              <div>{it.paymentMethod}</div>
              <div>{it.total}</div>
            </Card>
          );
        })}
      </div>
      <Footer />
    </>
  );
};
