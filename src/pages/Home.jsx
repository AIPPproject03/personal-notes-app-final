import React, { useState } from "react";
import { addNote } from "../api/app-data";
import "../styles/home.css";

function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Judul dan isi catatan tidak boleh kosong!");
      return;
    }

    setLoading(true);
    const { error } = await addNote({ title, body });

    if (!error) {
      alert("Catatan berhasil ditambahkan!");
      setTitle("");
      setBody("");
    } else {
      alert("Gagal menambahkan catatan. Coba lagi!");
    }
    setLoading(false);
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <p>Selamat datang di aplikasi catatan!</p>
      <form className="home-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Judul</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Masukkan judul catatan"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="body">Isi Catatan</label>
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            placeholder="Masukkan isi catatan"
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Menambahkan..." : "Tambah Catatan"}
        </button>
      </form>
    </div>
  );
}

export default Home;
