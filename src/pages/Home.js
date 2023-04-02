import React from "react";
import HeroSlider from "../components/sliders/HeroSlider";
import FeaturedSlider from "../components/sliders/FeaturedSlider";
import SectionsHead from "../components/common/SectionsHead";
import TopProducts from "../components/product/TopProducts";
import Services from "../components/common/Services";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { storage } from "../utils";

const Home = () => {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);

  if (urlParams.has("token")) {
    const token = urlParams.get("token");

    storage.save("user", { accessToken: token });
    window.location.replace("/");
  }

  return (
    <main>
      <Header />
      <section id="hero">
        <HeroSlider />
      </section>

      <section id="featured" className="section">
        <div className="container">
          <SectionsHead heading="Sản phẩm nổi bật" />
          <FeaturedSlider />
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <SectionsHead heading="Danh sách sản phẩm" />
          <TopProducts />
        </div>
      </section>
      <Services />
      <Footer />
    </main>
  );
};

export default Home;
