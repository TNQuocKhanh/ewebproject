import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, A11y, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import { getRelatedProduct } from "../../apis/product.api";
import { formatPrice } from "../../utils";

const RelatedSlider = (props) => {
  const { categoryId } = props;
  const [data, setData] = useState([]);

  const getRelated = async () => {
    try {
      const res = await getRelatedProduct(categoryId);
      setData(res);
    } catch (e) {
      console.log("[Get feature product] Error", e);
    }
  };

  useEffect(() => {
    if (categoryId) {
      getRelated();
    }
  }, []);

  return (
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
      {data?.map((item) => {
        const { id, mainImage, name, price, discountPrice } = item;
        const newPrice = formatPrice(discountPrice);
        const oldPrice = formatPrice(price);

        return (
          <SwiperSlide
            key={id}
            className="featured_slides"
            style={{
              borderRadius: "5px",
              background: "white",
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
            <div className="featured_title" style={{ height: "75px" }}>
              {name}
            </div>
            <h2 className="products_price">
              {newPrice} &nbsp;
              <small>
                <del>{oldPrice}</del>
              </small>
            </h2>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default RelatedSlider;
