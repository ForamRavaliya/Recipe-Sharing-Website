import React, { useEffect, useState } from "react";
import "./RecipeList.css";
import { useNavigate } from "react-router-dom";

export default function RecipeList() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="recipe-section">
      <h2>Popular Recipes</h2>

      <div className="recipe-grid">
        {recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          recipes.map((item) => (
            <div
              key={item.id}
              className="recipe-card"
              onClick={() => navigate(`/recipe/${item.id}`)}
            >
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
              />

              <h3>{item.name}</h3>

              {/* ⭐ Rating */}
              <p className="rating">
                ⭐ {item.rating ? Number(item.rating).toFixed(1) : "No rating"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}