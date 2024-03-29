import React from "react";
import HeroSlider from "../components/sliders/HeroSlider";
import FeaturedSlider from "../components/sliders/FeaturedSlider";
import SectionsHead from "../components/common/SectionsHead";
import TopProducts from "../components/product/TopProducts";
import Services from "../components/common/Services";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { storage } from "../utils";
import { SliderComponent } from "../components/sliders/SliderComponent";
import {RecentSlider} from "../components/sliders/RecentSlider";

const Home = () => {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);

  if (urlParams.has("token")) {
    const token = urlParams.get("token");

    storage.save("user", { accessToken: token });
    window.location.replace("/");
  }

  if (urlParams.has("error")) {
    window.location.replace("/register");
  }

  return (
    <main>
      <Header />
      <section id="hero">
        <HeroSlider />
      </section>

      <section id="featured" className="section">
        <div className="container">
          <SectionsHead
            background="linear-gradient(to right, var(--main-color) , #a1def5)"
            color="white"
            heading="Sản phẩm nổi bật"
          />
          <FeaturedSlider />
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <SectionsHead heading="Danh sách sản phẩm" />
          <TopProducts />
        </div>
      </section>

      <section>
        <SliderComponent title="Laptop" categoryId={1} viewAll={true} />
      </section>
      
      <section style={{margin: '60px 0'}}>
        <SliderComponent title="Màn hình" categoryId={3} viewAll={true} />
      </section>
      
      <section style={{margin: '60px 0'}}>
        <RecentSlider title="Sản phẩm vừa xem" />
      </section>
      <Services />
      <Footer />
    </main>
  );
};

export default Home;
