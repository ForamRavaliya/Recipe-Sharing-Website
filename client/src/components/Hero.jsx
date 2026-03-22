import React from "react";
import "./Hero.css";
import foodImage from "../assets/food.jpg";

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-card">
        <img src={foodImage} alt="food" className="hero-img" />

        <div className="hero-content">
          <h1>Share your favourite recipes here</h1>
          <p>
            Discover and share delicious recipes from around the world.
            Cook, explore, and inspire others with your food creations.
          </p>

          <button className="hero-btn">Explore Recipes</button>
        </div>
      </div>
    </div>
  );
}