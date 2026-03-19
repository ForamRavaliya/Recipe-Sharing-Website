import React from "react";
import "./Hero.css";
import foodImage from "../assets/food.jpg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <img src={foodImage} alt="food" className="hero-img" />

      <div className="hero-content">
        <h1>Share your favourite recipes here</h1>
        <p>
          Discover and share delicious recipes from around the world.
          Cook, explore, and inspire others with your food creations.
        </p>

        {/* 🔥 FIXED BUTTON */}
        <button
          className="hero-btn"
          onClick={() => navigate("/recipes")}
        >
          Explore Recipes
        </button>
      </div>
    </div>
  );
}