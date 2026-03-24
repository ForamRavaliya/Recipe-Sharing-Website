import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeList.css"; // reuse same styling

export default function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // 🔥 Fetch favorite recipes
  useEffect(() => {
    fetch("http://localhost:5000/favorites/1")
      .then((res) => res.json())
      .then((data) => {
        console.log("FAV DATA:", data);
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="recipe-section">
      <h2>❤️ Your Favorite Recipes</h2>

      {recipes.length === 0 ? (
        <p>No favorites yet 😢</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((item) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}