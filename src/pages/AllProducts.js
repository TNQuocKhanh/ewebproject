import React, { useEffect, useMemo, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import useDocTitle from "../hooks/useDocTitle";
import ProductCard from "../components/product/ProductCard";
import EmptyView from "../components/common/EmptyView";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getProductWithFilter, getListCategories } from "../apis";
import { Button, Pagination } from "@mui/material";
import _ from "lodash";
import Slider from "@mui/material/Slider";
import { formatPrice } from "../utils";
import { Loading } from "../components/common/Loading";
import Breadcrumbs from "../components/common/Breadcrumbs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  useDocTitle("Tất cả sản phẩm");

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [categoryList, setCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState();
  const [order, setOrder] = useState();
  const [categoryId, setCategoryId] = useState();
  const [page, setPage] = useState(1);

  const [range, setRange] = useState([0, 100]);
  const [cateArr, setCateArr] = useState([]);

  const [sortActive, setSortActive] = useState(null);

  const [cateFilter, setCateFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const matches = useMediaQuery("(max-width:1600px)");

  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get("productName");
  const cateId = urlParams.get("categoryId");

  const filter = {
    productName: name,
    categoryId: categoryId,
    page,
    size: perPage,
    sortBy,
    order,
    minPrice: range[0] * 300000,
    maxPrice: range[1] * 300000,
  };

  const getAllCategory = async () => {
    try {
      const res = await getListCategories();
      setCategoryList(res);
    } catch (e) {
      console.log("[Get category list] Error", e);
    }
  };

  const filteValue = useMemo(() => {
    filter.categoryId = categoryId;
    const _filter = _.omitBy(filter, (v) => !v);

    navigate("/all-products?" + new URLSearchParams(_filter));

    return _filter;
  }, [categoryId, range, order]);

  useEffect(() => {
    if (cateId) {
      setCateArr(cateId.split(",").map((it) => Number(it)));
    }
  }, []);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductWithFilter(filteValue);
      setData(res.content);
      setTotal(res.totalElements);
    } catch (err) {
      console.log("===Error", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, order, categoryId, range, cateId, cateFilter, cateArr, name]);

  const handleChanges = (e, newValue) => {
    setRange(newValue);
  };

  const handleCategory = (id) => {
    const index = cateArr.indexOf(id);
    if (index !== -1) {
      cateArr.splice(index, 1);
    } else {
      cateArr.push(id);
    }
    setCategoryId(cateArr.join(","));
  };

  return (
    <>
      <Header />
      <Breadcrumbs />
      <section id="all_products" className="section">
        <aside id="filterbar">
          <div className="filterbar_wrapper">
            <div className={`sort_options show`}>
              <div className="sort_head">
                <Button
                  variant="outlined"
                  sx={{ margin: "10px 0" }}
                  onClick={() => window.location.replace("/all-products")}
                >
                  Bỏ lọc
                </Button>
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
                    setSortActive("ASC");
                  }}
                  style={
                    sortActive === "ASC" ? { textDecoration: "underline" } : {}
                  }
                >
                  Giá tăng dần
                </li>
                <li
                  onClick={() => {
                    setSortBy("price");
                    setOrder("DESC");
                    setSortActive("DESC");
                  }}
                  style={
                    sortActive === "DESC" ? { textDecoration: "underline" } : {}
                  }
                >
                  Giá giảm dần
                </li>
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
                        checked={cateArr.includes(id)}
                        type="checkbox"
                        id={name}
                        value={name}
                        onChange={() => handleCategory(id)}
                      />
                      <label htmlFor={name}>{name}</label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="filter_block">
              <h4>Khoảng giá</h4>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  style={{
                    maxWidth: "120px",
                    border: "1px solid #dddddd",
                    padding: "10px",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                  value={formatPrice(range[0] * 300000)}
                />
                <input
                  style={{
                    maxWidth: "130px",
                    border: "1px solid #dddddd",
                    padding: "10px",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                  value={formatPrice(range[1] * 300000)}
                />
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

        {loading ? (
          <Loading />
        ) : (
          <div
            className="container"
            style={matches ? { maxWidth: "1000px" } : {}}
          >
            {data?.length > 0 ? (
              <>
                <div className="wrapper products_wrapper">
                  {data.map((item) => (
                    <ProductCard key={item.id} {...item} />
                  ))}
                </div>
                <div
                  style={{
                    margin: "20px 0",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    count={Math.ceil(total / perPage)}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={(e, v) => setPage(v)}
                  />
                </div>
              </>
            ) : (
              <EmptyView
                icon={<BsExclamationCircle />}
                msg="Không tìm thấy sản phẩm"
              />
            )}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default AllProducts;
