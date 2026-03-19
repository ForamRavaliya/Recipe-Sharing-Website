import React from "react";
import "./Navbar.css";
import { FaSearch, FaShoppingCart, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      {/* Logo */}
      <h2 className="logo" onClick={() => navigate("/")}>
        Recipeo.
      </h2>

      {/* Links */}
      <ul className="nav-links">
        <li onClick={() => navigate("/")}>home</li>
        <li onClick={() => navigate("/recipes")}>recipes</li>
        <li onClick={() => navigate("/add")}>share</li>
        <li onClick={() => navigate("/contact")}>contact</li>
      </ul>

      {/* Icons */}
      <div className="nav-icons">

        <FaSearch
          className="icon"
          onClick={() => navigate("/recipes")}
        />

        <FaPlus
          className="icon"
          onClick={() => navigate("/add")}
        />

        <FaShoppingCart
          className="icon"
          onClick={() => navigate("/favorites")}
        />

        <button
          className="signin-btn"
          onClick={() => navigate("/login")}
        >
          sign in
        </button>

      </div>

    </nav>
  );
}