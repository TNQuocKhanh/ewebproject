import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { DetailLoading } from "../components/common/Loading";
import { toast } from "react-toastify";
import Toastify from "../components/product/Toastify";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link as LinkMui,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import SectionsHead from "../components/common/SectionsHead";
import RelatedSlider from "../components/sliders/RelatedSlider";

const ProductDetails = () => {
  useDocTitle("Chi tiết sản phẩm");

  const { handleActive, activeClass } = useActive(0);
  const { addItem, cart } = useContext(cartContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const getReviewByUser = async () => {
    try {
      const res = await getReviewByCustomer(productId);
    } catch (err) {
      console.log("[Get review by Id]", err);
    }
  };

  useEffect(() => {
    getProductDetail();
    if (storage.load("user")) {
      getReviewByUser();
    }
  }, [productId]);

  const {
    name,
    category: cate,
    discountPrice,
    price,
    reviewCount,
    productImages = [],
    customerCanReview,
    specifications,
    description,
    averageRating,
    mainImage,
    quantity,
  } = data;

  const [previewImg, setPreviewImg] = useState(
    _.get(productImages, "0")?.extraImage || ""
  );

  const handleAddItem = () => {
    const find = cart.find((it) => it.id === data.id);
    if (find) {
      if (find.amount > data.quantity) {
        toast.info("Đã thêm tối đa số lượng sản phẩm");
      } else {
        addItem(data);
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } else {
      addItem(data);
      toast.success("Thêm vào giỏ hàng thành công");
    }
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
      <div className="container">
        <MUIBreadcrumbs aria-label="breadcrumb" sx={{ marginTop: "10rem" }}>
          <LinkMui
            sx={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => navigate("/")}
          >
            Trang chủ
          </LinkMui>
          /<Typography>Chi tiết sản phẩm</Typography>/
          <Typography>{name}</Typography>
        </MUIBreadcrumbs>
      </div>
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
                <strong>{reviewCount}</strong> Đánh giá |
                <Rating
                  name="half-rating"
                  defaultValue={averageRating}
                  precision={0.5}
                  readOnly
                />
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
                  {quantity >= 1 ? "Còn hàng" : "Hết hàng"}
                </div>
              </div>

              <div className="separator"></div>

              <div className="prod_details_buy_btn">
                <Button
                  onClick={handleAddItem}
                  disabled={quantity <= 0}
                  sx={{
                    bgcolor: "#ff0000cc",
                    width: "fit-content",
                    padding: "12px 24px",
                    color: "#fff",
                    borderRadius: "5px",
                    ":hover": {
                      bgcolor: "#f4c24b",
                    },
                  }}
                >
                  Thêm vào giỏ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSummary
        customerCanReview={customerCanReview}
        specs={specifications}
        description={description}
      />
      <div style={{ maxWidth: "1240px", margin: "40px auto" }}>
        <SectionsHead
          background="linear-gradient(to right, var(--main-color) , #a1def5)"
          color="white"
          heading="Sản phẩm cùng loại"
        />
        <RelatedSlider categoryId={cate?.id} />
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
