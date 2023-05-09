import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdStar, IoMdCheckmark } from "react-icons/io";
import useDocTitle from "../hooks/useDocTitle";
import useActive from "../hooks/useActive";
import cartContext from "../contexts/cart/cartContext";
import ProductSummary from "../components/product/ProductSummary";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {
  getProductById,
  getReviewByCustomer,
  getReviewByProductId,
} from "../apis";
import _ from "lodash";
import { storage, formatPrice } from "../utils";
import Messenger from "../components/common/Messenger";
import { DetailLoading, Loading } from "../components/common/Loading";
import { toast } from "react-toastify";
import Toastify from "../components/product/Toastify";

const ProductDetails = () => {
  useDocTitle("Chi tiết sản phẩm");

  const { handleActive, activeClass } = useActive(0);
  const { addItem, cart } = useContext(cartContext);
  const { productId } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [listReview, setListReview] = useState([]);

  const getProductDetail = async () => {
    setIsLoading(true);
    try {
      const res = await getProductById(productId);
      setData(res);
    } catch (e) {
      console.log("[Get product detail] Error", e);
    }
    setIsLoading(false);
  };

  const getListReview = async () => {
    const res = await getReviewByProductId(productId);
    setListReview(res);
  };

  const getReviewByUser = async () => {
    const res = await getReviewByCustomer(productId);
  };

  useEffect(() => {
    getProductDetail();
    getListReview();
    if (storage.load("user")) {
      getReviewByUser();
    }
  }, []);

  const {
    name,
    category: cate,
    discountPrice,
    price,
    inStock,
    reviewCount,
    productImages = [],
    customerCanReview,
    specifications,
    description,
    averageRating,
    mainImage,
  } = data;

  const [previewImg, setPreviewImg] = useState(
    _.get(productImages, "0")?.extraImage || ""
  );

  const handleAddItem = () => {
    addItem(data);
    toast.success("Thêm vào giỏ hàng thành công");
  };

  useEffect(() => {
    setPreviewImg(productImages[0]?.extraImage);
    handleActive(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productImages]);

  const handlePreviewImg = (img, i) => {
    setPreviewImg(img.extraImage);
    handleActive(i);
  };

  const discountedPrice = price - discountPrice;
  const newPrice = formatPrice(discountPrice);
  const oldPrice = formatPrice(price);
  const savedPrice = formatPrice(discountedPrice);
  const savedDiscount = Math.round((1 - discountPrice / price) * 100);

  if (isLoading) return <DetailLoading />;

  return (
    <>
    <Header />
    <Toastify />
      <section id="product_details" className="container">
        <div className="container">
          <div className="wrapper prod_details_wrapper">
            <div className="prod_details_left_col">
              <figure className="prod_details_img">
                <img
                  src={_.isEmpty(productImages) ? mainImage : previewImg}
                  alt="product-img"
                  style={{
                    width: "inherit",
                    height: "inherit",
                    objectFit: "contain",
                  }}
                />
              </figure>
              <div className="prod_details_tabs">
                {productImages.map((img, i) => (
                  <div
                    key={i}
                    className={`tabs_item ${activeClass(i)}`}
                    onClick={() => handlePreviewImg(img, i)}
                  >
                    <img src={img.extraImage} alt="product-img" />
                  </div>
                ))}
              </div>
            </div>

            <div className="prod_details_right_col">
              <h1 className="prod_details_title">{name}</h1>
              <h4 className="prod_details_info">{cate?.name}</h4>

              <div className="prod_details_ratings">
                <span className="rating_star">
                  {averageRating}
                  {Array(4)
                    .fill()
                    .map((it, idx) => (
                      <IoMdStar key={idx} />
                    ))}
                </span>
                <span>|</span>
                <Link to="#">{reviewCount} Đánh giá</Link>
              </div>

              <div className="separator"></div>

              <div className="prod_details_price">
                <div className="price_box">
                  <h2 className="price">
                    {newPrice} &nbsp;
                    <small className="del_price">
                      <del>{oldPrice}</del>
                    </small>
                  </h2>
                  <p className="saved_price">
                    Tiết kiệm: {savedPrice} ({savedDiscount}%)
                  </p>
                  <span className="tax_txt">(Đã bao gồm thuế)</span>
                </div>

                <div className="badge">
                  {inStock ? (
                    <span>
                      <IoMdCheckmark /> Còn hàng
                    </span>
                  ) : (
                    <span>Hết hàng</span>
                  )}
                </div>
              </div>

              <div className="separator"></div>

              <div className="prod_details_buy_btn">
                <button type="button" className="btn" onClick={handleAddItem}>
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSummary
        customerCanReview={customerCanReview}
        listReview={listReview}
        specs={specifications}
        description={description}
      />
      <Messenger />
      <Footer />
    </>
  );
};

export default ProductDetails;
