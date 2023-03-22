import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import useActive from "../../hooks/useActive";
import productsData from "../../data/productsData";
import ProductCard from "./ProductCard";
import { getListProducts } from "../../apis";

const TopProducts = () => {
  const [products, setProducts] = useState(productsData);
  const { activeClass, handleActive } = useActive(0);

  // making a unique set of product's category
  const productsCategory = [
    "All",
    ...new Set(productsData.map((item) => item.category)),
  ];

  // handling product's filtering
  const handleProducts = (category, i) => {
    if (category === "All") {
      setProducts(productsData);
      handleActive(i);
      return;
    }

    const filteredProducts = productsData.filter(
      (item) => item.category === category
    );
    setProducts(filteredProducts);
    handleActive(i);
  };

  const [data, setData] = useState([]);

  const getAllProducts = async () => {
    const res = await getListProducts();
    if (res) {
      console.log("===", res);
      setData(res);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="products_filter_tabs">
        <ul className="tabs">
          {productsCategory.map((item, i) => (
            <li
              key={i}
              className={`tabs_item ${activeClass(i)}`}
              onClick={() => handleProducts(item, i)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="wrapper products_wrapper">
        {data.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default TopProducts;
//<div className="wrapper products_wrapper">
//{products.slice(0, 10).map((item) => (
//<ProductCard key={item.id} {...item} />
//))}
//</div>
