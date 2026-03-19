import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart, FaClock, FaUser } from "react-icons/fa";
import "./RecipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [favorite, setFavorite] = useState(false);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.log(err));
  }, [id]);

  // 🔥 ADD TO FAVORITES
  const addFavorite = async () => {
    await fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: 1,
        recipe_id: id
      })
    });

    setFavorite(!favorite);
  };

  if (!recipe) return <h2>Loading...</h2>;

  return (
    <div className="detail-container">

      {/* 🔙 Back */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="detail-card">

        {/* Image */}
        <div className="image-section">
          <img
            src={`http://localhost:5000/uploads/${recipe.image}`}
            alt={recipe.name}
          />

          {/* ❤️ Favorite */}
          <div className="favorite-icon" onClick={addFavorite}>
            {favorite ? <FaHeart color="red" /> : <FaRegHeart />}
          </div>
        </div>

        {/* Content */}
        <div className="detail-content">

          <h1>{recipe.name}</h1>

          {/* ⭐ Rating */}
          <div className="rating">
            <FaStar color="#FFD700" />
            <span>{recipe.rating || 4.5}</span>
          </div>

          {/* ⏱ Time & 👨‍🍳 Author */}
          <div className="info">
            <span><FaClock /> {recipe.time}</span>
            <span><FaUser /> {recipe.author || "Chef"}</span>
          </div>

          {/* 🟡 Tabs */}
          <div className="tabs">
            <button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </button>

            <button
              className={activeTab === "steps" ? "active" : ""}
              onClick={() => setActiveTab("steps")}
            >
              Instructions
            </button>
          </div>

          {/* Content */}
          {activeTab === "ingredients" ? (
            <ul>
              {recipe.ingredients?.split(",").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{recipe.steps}</p>
          )}
        </div>
      </div>
    </div>
  );
}