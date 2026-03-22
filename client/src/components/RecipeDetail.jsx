import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaClock,
  FaUser,
} from "react-icons/fa";
import "./RecipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [favorite, setFavorite] = useState(false);

  // ⭐ Review states
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // 🔥 Fetch recipe
  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.log(err));
  }, [id]);

  // 🔥 Fetch reviews
  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, [id]);

  // ❤️ Favorite
  const addFavorite = async () => {
    await fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: 1, recipe_id: id }),
    });

    setFavorite(!favorite);
  };

  // ⭐ Submit review
  const submitReview = () => {
    fetch(`http://localhost:5000/recipes/${id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, comment }),
    })
      .then(() => {
        alert("Review added!");
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
            <span>
              {recipe.rating
                ? Number(recipe.rating).toFixed(1)
                : "No rating"}
            </span>
          </div>

          {/* ⏱ Time & 👨‍🍳 Author */}
          <div className="info">
            <span>
              <FaClock /> {recipe.time}
            </span>
            <span>
              <FaUser /> {recipe.author || "Chef"}
            </span>
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
              {recipe.ingredients
                ?.split(",")
                .map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          ) : (
            <p>{recipe.steps}</p>
          )}
        </div>
      </div>

      {/* ⭐ Add Review */}
      <div className="review-box">
        <h3>Add Review</h3>

        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          onChange={(e) => setRating(e.target.value)}
        />

        <textarea
          placeholder="Write your review..."
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={submitReview}>Submit</button>
      </div>

      {/* 📝 Show Reviews */}
      <div className="reviews-list">
        <h3>User Reviews</h3>

        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="review-item">
              ⭐ {r.rating}
              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}