import React, { useState } from "react";
import Annoucement from "../components/Annoucement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log("The category selected",selectedCategory)
  return (
    <div>
      <Annoucement />
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="slider-wrapper">
        <Slider />
      </div>

      <Categories
        onCategoryClick={(category) => setSelectedCategory(category)}
      />
      <Products searchQuery={searchQuery} onCategoryClick={selectedCategory} />
      <style jsx>{`
        @media (max-width: 768px) {
          .slider-wrapper {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
