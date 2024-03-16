import React from "react";
import Annoucement from "../components/Annoucement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
    return (
        <div>
            <Annoucement/>
            <Navbar/>
            <div className="slider-wrapper">
                <Slider/>
            </div>
            <Categories/>
            <Products/>
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
