import React from "react";
import { Link } from "react-router-dom";
import "../styles/404.css";

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak tersedia.</p>
      <Link to="/">Kembali ke Beranda</Link>
    </div>
  );
}

export default NotFoundPage;
