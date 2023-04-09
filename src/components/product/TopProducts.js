import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getListProducts } from "../../apis";

const TopProducts = () => {
  const [data, setData] = useState([]);

  const getAllProducts = async () => {
    const res = await getListProducts();
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
