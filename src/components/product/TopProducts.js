import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getListProducts } from "../../apis";
import {Loading} from "../common/Loading";

const TopProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  const getAllProducts = async () => {
    setLoading(true)
    const res = await getListProducts();
    if (res) {
      setData(res);
    }
    setLoading(false)
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if(loading) return <Loading />

  return (
    <>
      <div className="wrapper products_wrapper">
        {data?.slice(0.1).map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default TopProducts;
