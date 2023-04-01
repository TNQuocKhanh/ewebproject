import { useEffect, useState } from "react";
import { getListOrders } from "../apis";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export const Order = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    const res = await getListOrders();
    console.log("====", res);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <Header />
      <div>Orders</div>
    </>
  );
};
