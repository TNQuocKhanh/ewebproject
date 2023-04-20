import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import productsData from "../../data/productsData";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";

const HeroSlider = () => {
  const heroProducts = productsData.filter(
    (item) => item.tag === "hero-product"
  );

  return (
    <Swiper
      className="container"
      modules={[Pagination, A11y, Autoplay]}
      loop={true}
      speed={400}
      spaceBetween={100}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {heroProducts.map((item, i) => {
        const {
          id,
          title,
          tagline,
          heroImage,
          finalPrice,
          originalPrice,
          path,
        } = item;
        const newPrice =finalPrice;
        const oldPrice =originalPrice;

        return (
          <SwiperSlide
            key={id}
            className={`wrapper hero_wrapper hero_slide-${i}`}
          >
            <div className="hero_item_txt">
              <h4>{title}</h4>
              <h2>{tagline}</h2>
              <h2 className="hero_price">
                {newPrice} &nbsp;
                <small>
                  <del>{oldPrice}</del>
                </small>
              </h2>
              <Link
                to={`${path}${id}`}
                className="btn"
                style={{ background: "var(--main-color)" }}
              >
                Mua ngay
              </Link>
            </div>
            <figure className="hero_item_img">
              <img
                style={{ width: "100%" }}
                src={heroImage}
                alt="product-img"
              />
            </figure>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
