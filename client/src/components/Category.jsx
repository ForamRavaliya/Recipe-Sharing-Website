import React from "react";
import "./Category.css";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Kathiyawadi",
      value: "kathiyawadi",
      image: "/images/kathiyawadi.jpeg",
    },
    {
      name: "South Indian",
      value: "south-indian",
      image: "/images/SouthIndian.jpeg",
    },
    {
      name: "Fast Food",
      value: "fast-food",
      image: "/images/fastFood.jpeg",
    },
    {
      name: "Punjabi",
      value: "punjabi",
      image: "/images/punjabi.jpeg",
    },
  ];

  return (
    <div className="category-section">
      <h2>Explore Categories</h2>

      <div className="category-grid">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="category-card"
            onClick={() =>
              navigate(`/recipes?category=${cat.value}`)
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