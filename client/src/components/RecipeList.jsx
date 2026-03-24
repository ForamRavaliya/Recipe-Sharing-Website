import React, { useEffect, useState } from "react";
import "./RecipeList.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function RecipeList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [recipes, setRecipes] = useState([]);

  // 🔍 Get query params
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";
  const category = query.get("category") || "";

  // 🔥 Fetch recipes
  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then((res) => res.json())
      .then((data) => {
        console.log("RECIPES:", data);
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 FILTER (SEARCH + CATEGORY)
  const filteredRecipes = recipes.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category
      ? item.category?.toLowerCase() === category.toLowerCase()
      : true;

    return matchSearch && matchCategory;
  });

  return (
    <div className="recipe-section">
      <h2>Popular Recipes</h2>

      {/* 🔍 Show search */}
      {search && <p>🔍 Showing results for: "{search}"</p>}

      {/* 🍽 Show category */}
      {category && <p>🍽 Category: {category}</p>}

      <div className="recipe-grid">
        {filteredRecipes.length === 0 ? (
          <p>No recipes found 😢</p>
        ) : (
          filteredRecipes.map((item) => (
            <div
              key={item.id}
              className="recipe-card"
              onClick={() => navigate(`/recipe/${item.id}`)}
            >
              {/* Image */}
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
              />

              {/* Name */}
              <h3>{item.name}</h3>

              {/* ⭐ Rating */}
              <p className="rating">
                ⭐{" "}
                {item.rating
                  ? Number(item.rating).toFixed(1)
                  : "No rating"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}