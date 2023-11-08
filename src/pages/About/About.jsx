import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Slides from "../../components/Slides/Slides";

const IMAGES_BANNER = [
    {
      id: 1,
      image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/Sliding%20(9).png"
    },
    {
      id: 2,
      image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/xiaomi-redmi-12-series-sliding-th99.jpg"
    },
    {
      id: 3,
      image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-realme%2011-009.jpg"
    },
    {
      id: 4,
      image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-realme%2011-009.jpg"
    }
  ]

const About = () => {
  return (
    <div>
      <Header />
      
      <div class="grid gap-4 grid-cols-2">
        <div className="border-2 rounded-xl shadow-md">
            <h1 className="text-center">TIN TỨC MỚI</h1>
            <Slides DATA={IMAGES_BANNER}/>
        </div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
