import React, { useContext, useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import useDocTitle from "../hooks/useDocTitle";
import ProductCard from "../components/product/ProductCard";
import EmptyView from "../components/common/EmptyView";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getProductWithFilter, getListCategories } from "../apis";
import { Button } from "@mui/material";
import _ from "lodash";
import Slider from "@mui/material/Slider";
import Messenger from "../components/common/Messenger";

const AllProducts = () => {
  useDocTitle("All Products");

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [categoryList, setCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState();
  const [order, setOrder] = useState();
  const [categoryId, setCategoryId] = useState();
  const [page, setPage] = useState(1);

  const [range, setRange] = useState([0, 100]);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get("productName");
  const cateId = urlParams.get("categoryId")

  const filter = {
    productName: name,
    categoryId: cateId,
    page,
    size: perPage,
    sortBy,
    order,
    minPrice: range[0] * 300000,
    maxPrice: range[1] * 300000,
  };

  const _filter = _.omitBy(filter, (v) => !v);

  const getAllCategory = async () => {
    try {
      const res = await getListCategories();
      setCategoryList(res);
    } catch (e) {
      console.log("===Error");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllProducts = async () => {
    try {
      const res = await getProductWithFilter(_filter);
      setData(res.content);
      setTotal(res.totalElements);
    } catch (err) {
      console.log("===Error", err);
    }
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, order, categoryId, range, cateId]);

  const handleChanges = (e, newValue) => {
    setRange(newValue);
  };
  
  return (
    <>
      <Header />
      <section id="all_products" className="section">
        <aside id="filterbar">
          <div className="filterbar_wrapper">
            <div className={`sort_options show`}>
              <div className="sort_head">
                <h4 className="title">Sắp xếp theo</h4>
                <button type="button" className="close_btn">
                  &times;
                </button>
              </div>

              <div className="separator"></div>

              <ul className="sort_menu">
                <li
                  onClick={() => {
                    setSortBy("price");
                    setOrder("ASC");
                  }}
                >
                  Giá tăng dần
                </li>
                <li
                  onClick={() => {
                    setSortBy("price");
                    setOrder("DESC");
                  }}
                >
                  Giá giảm dần
                </li>
                <li>Mới nhất</li>
              </ul>
            </div>
            <div className="filter_block">
              <h4>Danh mục</h4>
              <ul className="filter_menu">
                {categoryList.map((item) => {
                  const { id, name } = item;
                  return (
                    <li key={id} className="filter_btn">
                      <input
                        type="checkbox"
                        id={name}
                        value={name}
                        onChange={() => setCategoryId(id)}
                      />
                      <label htmlFor={name}>{name}</label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="filter_block">
              <h4>Khoảng giá</h4>
              <div style={{display: 'flex', gap: '8px'}}>
              <input style={{maxWidth: '90px', border: '1px solid #dddddd', padding: '10px', borderRadius: '5px', textAlign: 'center'}} value={range[0]*300000} />
              <input style={{maxWidth: '90px', border: '1px solid #dddddd', padding: '10px', borderRadius: '5px', textAlign: 'center'}} value={range[1]*300000} />
              </div>
              <div className="price_filter">
                <Slider
                  value={range}
                  onChange={handleChanges}
                  valueLabelDisplay="auto"
                />
              </div>
            </div>
          </div>
        </aside>

        <div className="container">
          {data?.length > 0 ? (
            <>
              <div className="wrapper products_wrapper">
                {data.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))}
              </div>
              <div style={{ margin: "10px 0", textAlign: 'center' }}>
                {Array(Math.ceil(total / perPage))
                  .fill()
                  .map((v, i) => (
                    <Button
                      key={i}
                      variant="outlined"
                      sx={{ marginRight: 2 }}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
              </div>
            </>
          ) : (
            <EmptyView
              icon={<BsExclamationCircle />}
              msg="Không tìm thấy sản phẩm"
            />
          )}
        </div>
      </section>
      <Messenger/>
      <Footer />
    </>
  );
};

export default AllProducts;
