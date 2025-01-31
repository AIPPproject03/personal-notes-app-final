import React, { useState } from "react";
import { login } from "../api/app-data";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error, data } = await login(form);
    if (!error) {
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data);
      navigate("/");
    } else {
      setError("Login gagal! Periksa email atau password.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Notes App</h1>
        <h2>Masuk ke Akun</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Masuk</button>
        </form>
        <p className="register-link">
          Belum punya akun? <a href="/register">Daftar</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
