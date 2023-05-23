import React from "react";
import SectionsHead from "./SectionsHead";
import {
  FaShippingFast,
  FaShieldAlt,
  FaTags,
  FaCreditCard,
} from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    icon: <FaShippingFast />,
    title: "Giao hàng nhanh chóng",
    info: "Giao hàng trong 24 giờ",
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: "Sản phẩm chính hãng",
    info: "100% sản phẩm chính hãng",
  },
  {
    id: 3,
    icon: <FaTags />,
    title: "Ưu đãi hấp dẫn",
    info: "Trên tất cả các đơn đặt trước",
  },
  {
    id: 4,
    icon: <FaCreditCard />,
    title: "Thanh toán an toàn",
    info: "Thanh toán an toàn",
  },
];

const Services = () => {
  return (
    <>
      <section id="services" className="section">
        <div className="container">
          <SectionsHead heading="Tiện ích của chúng tôi" />
          <div className="wrapper services_wrapper">
            {servicesData.map((item) => {
              const { id, icon, title, info } = item;

              return (
                <div className="services_card" key={id}>
                  <div className="services_icon">{icon}</div>
                  <div className="services_details">
                    <h4>{title}</h4>
                    <p>{info}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
