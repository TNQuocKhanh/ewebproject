import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getListProducts } from "../../apis";
import { Loading } from "../common/Loading";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { AiOutlineExport } from "react-icons/ai";
const TopProducts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    setLoading(true);
    const res = await getListProducts();
    if (res) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="wrapper products_wrapper">
        {data?.slice(0, 10).map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <Button
          onClick={() => navigate("/all-products")}
          sx={{
            bgcolor: "#ff0000cc",
            width: "fit-content",
            padding: "12px",
            color: "#fff",
            borderRadius: "5px",
            fontWeight: "600",
            ":hover": {
              bgcolor: "#f4c24b",
            },
          }}
        >
          Xem tất cả sản phẩm &nbsp;
          <AiOutlineExport />
        </Button>
      </div>
    </>
  );
};

export default TopProducts;
