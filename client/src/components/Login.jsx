import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(email, password);

    // 🔥 later connect backend
    // fetch("http://localhost:5000/auth/login", ...)
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}