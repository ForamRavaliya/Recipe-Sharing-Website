import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

const categories = [
  { name: "Kathiyawadi", image: "/images/kathiyawadi.jpg" },
  { name: "South Indian", image: "/images/south.jpg" },
  { name: "Fast Food", image: "/images/fastfood.jpg" },
  { name: "Punjabi", image: "/images/punjabi.jpg" },
];

export default function Category() {
  const navigate = useNavigate();

  return (
    <div className="category-section">
      <h2>Explore Categories</h2>

      <div className="category-grid">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="category-card"
            onClick={() =>
              navigate(`/recipes?category=${cat.name}`)
            }
          >
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}