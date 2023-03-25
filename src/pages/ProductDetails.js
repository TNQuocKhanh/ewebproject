import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdStar, IoMdCheckmark } from "react-icons/io";
import { calculateDiscount, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import useActive from "../hooks/useActive";
import cartContext from "../contexts/cart/cartContext";
import productsData from "../data/productsData";
import SectionsHead from "../components/common/SectionsHead";
import RelatedSlider from "../components/sliders/RelatedSlider";
import ProductSummary from "../components/product/ProductSummary";
import Services from "../components/common/Services";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getProductById } from "../apis";
import _ from 'lodash'

const ProductDetails = () => {
  useDocTitle("Product Details");

  const { handleActive, activeClass } = useActive(0);

  const { addItem } = useContext(cartContext);

  const { productId } = useParams();

  const prodId = parseInt(productId);

  const product = productsData.find((item) => item.id === prodId);

  const [data, setData] = useState({});

  const getProductDetail = async () => {
    const res = await getProductById(productId);
    setData(res);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const { images, category } = product;

  const {
    name,
    category: cate,
    discountPrice,
    price,
    inStock,
    reviewCount,
    mainImage, productImages=[]
  } = data;
  const [previewImg, setPreviewImg] = useState(_.get(productImages, '0')?.extraImage || '');

  const handleAddItem = () => {
    addItem(data);
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

  // calculating Prices
  const discountedPrice = price - discountPrice;
  const newPrice = displayMoney(discountPrice);
  const oldPrice = displayMoney(price);
  const savedPrice = displayMoney(discountedPrice);
  const savedDiscount = calculateDiscount(discountedPrice, price);

  return (
    <>
      <Header />
      <section id="product_details" className="section">
        <div className="container">
          <div className="wrapper prod_details_wrapper">
            <div className="prod_details_left_col">
              <figure className="prod_details_img">
                <img src={mainImage} alt="product-img" />
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
                  <IoMdStar />
                  <IoMdStar />
                </span>
                <span>|</span>
                <Link to="*">{reviewCount} Đánh giá</Link>
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

      <ProductSummary {...product} />

      <section id="related_products" className="section">
        <div className="container">
          <SectionsHead heading="Sản phẩm liên quan" />
          <RelatedSlider category={category} />
        </div>
      </section>

      <Services />
      <Footer />
    </>
  );
};

export default ProductDetails;
