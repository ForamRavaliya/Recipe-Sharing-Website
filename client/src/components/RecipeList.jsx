import React, { useEffect, useState } from "react";
import "./RecipeList.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function RecipeList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [recipes, setRecipes] = useState([]);

  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";
  const category = query.get("category") || "";

  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then((res) => res.json())
      .then((data) => {
        console.log("RECIPES:", data);
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredRecipes = recipes.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category
      ? item.category?.toLowerCase() === category.toLowerCase()
      : true;

    return matchSearch && matchCategory;
  });

  console.log("URL category:", category);

  return (
    <div className="recipe-section">
      <h2>Popular Recipes</h2>

      {search && <p>🔍 Showing results for: "{search}"</p>}
      {category && <p>🍽 Category: {category}</p>}

      <div className="recipe-grid">
        {filteredRecipes.length === 0 ? (
          <p>No recipes found 😢</p>
        ) : (
          filteredRecipes.map((item) => {
            console.log("DB category:", item.category); // ✅ correct place

            return (
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

                <p className="rating">
                  ⭐{" "}
                  {item.rating
                    ? Number(item.rating).toFixed(1)
                    : "No rating"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}