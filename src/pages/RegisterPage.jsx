import React, { useState } from "react";
import { register } from "../api/app-data";
import { useNavigate } from "react-router-dom";

import "../styles/regist.css";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    const { error } = await register(form);
    if (!error) {
      navigate("/login");
    } else {
      setError("Registrasi gagal! Silakan coba lagi.");
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Welcome to Notes App</h1>
        <h2>Registrasi</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            required
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          <button type="submit">Daftar</button>
        </form>
        <p className="login-link">
          Sudah punya akun? <a href="/login">Login di sini</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
