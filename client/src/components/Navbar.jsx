import React, { useState } from "react";
import "./Navbar.css";
import { FaSearch, FaShoppingCart, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate(`/recipes?search=${search}`);
  };

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

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {/* 🔍 Search */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="icon" onClick={handleSearch} />
        </div>

        {/* ➕ Add */}
        <FaPlus
          className="icon"
          onClick={() => navigate("/add")}
        />

        {/* 🛒 Favorites */}
        <FaShoppingCart
          className="icon"
          onClick={() => navigate("/favorites")}
        />

        {/* 🔐 Login */}
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