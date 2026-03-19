import React, { useEffect, useState } from "react";
import "./RecipeList.css";
import { useNavigate } from "react-router-dom";

export default function RecipeList() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  // 🔥 FETCH DATA FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/recipes") // ✅ FIXED
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // DEBUG
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="recipe-section">
      <h2>Popular Recipes</h2>

      <div className="recipe-grid">
        {recipes.map((item) => (
          <div
            key={item.id}
            className="recipe-card"
            onClick={() => navigate(`/recipe/${item.id}`)}
          >
            {/* 🔥 IMAGE FROM BACKEND */}
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.name}
            />

            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}