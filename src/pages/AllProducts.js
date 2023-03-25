import React, { useContext, useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import useDocTitle from "../hooks/useDocTitle";
import FilterBar from "../components/filters/FilterBar";
import ProductCard from "../components/product/ProductCard";
import Services from "../components/common/Services";
import filtersContext from "../contexts/filters/filtersContext";
import EmptyView from "../components/common/EmptyView";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getListProducts } from "../apis";

const AllProducts = () => {
  useDocTitle("All Products");

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
  const { allProducts } = useContext(filtersContext);

  return (
    <>
      <Header />
      <section id="all_products" className="section">
        <FilterBar />

        <div className="container">
          {allProducts.length ? (
            <div className="wrapper products_wrapper">
              {data.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <EmptyView
              icon={<BsExclamationCircle />}
              msg="Không tìm thấy sản phẩm"
            />
          )}
        </div>
      </section>
      <Services />
      <Footer />
    </>
  );
};

export default AllProducts;
