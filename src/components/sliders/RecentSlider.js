import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, A11y, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import { getListProducts } from "../../apis/product.api";
import { formatPrice } from "../../utils";
import SectionsHead from "../common/SectionsHead";
import _ from 'lodash'

export const RecentSlider = (props) => {
  const { title, viewAll = false } = props;

  const [recentData, setRecentData] = useState([])
  
  const productRecentIds = JSON.parse(localStorage.getItem('myRecentCart'))

  const getAllProducts = async () => {
    const res = await getListProducts();
    if (res) {
      const _recentData =_.keyBy(res,'id')
      const foundRecent = productRecentIds.map(it => _recentData[it])
      setRecentData(foundRecent.reverse())
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  
  return (
    recentData.length > 0 &&
    <div className="container">
      <SectionsHead
        background="linear-gradient(to right, var(--main-color) , #a1def5)"
        color="white"
        heading={title}
        viewAll={viewAll}
      />
      <Swiper
        style={{
          background: "linear-gradient(to right, var(--main-color) , #a1def5)",
          padding: "50px",
        }}
        modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
        loop={true}
        speed={400}
        spaceBetween={100}
        slidesPerView={"auto"}
        initialSlide={3}
        pagination={{ clickable: true }}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 200,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="featured_swiper"
      >
        {recentData?.map((item) => {
          const { id, mainImage, name, price, discountPercent, discountPrice } =
            item;
          const newPrice = formatPrice(discountPrice);
          const oldPrice = formatPrice(price);

          return (
            <SwiperSlide
              key={id}
              className="featured_slides"
              style={{
                borderRadius: "5px",
                background: "white",
                padding: "0.7rem",
              }}
            >
              <figure className="featured_img">
                <Link to={`/product-details/${id}`}>
                  <img
                    style={{ height: "160px", objectFit: "contain" }}
                    src={mainImage}
                    alt=""
                  />
                </Link>
              </figure>
              <div
                className="featured_title"
                style={{ height: "75px", fontWeight: "bold" }}
              >
                {name}
              </div>
              <h2 className="products_price" style={{ textAlign: "left" }}>
                {newPrice} &nbsp;
              </h2>
              <h2 className="products_price" style={{ textAlign: "left" }}>
                <small>
                  <del>{oldPrice}</del>&nbsp; -{discountPercent}%
                </small>
              </h2>
            </SwiperSlide>
          );
        })}
      </Swiper>
      </div>
  );
};
