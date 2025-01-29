import React, { useState } from "react";
import { addNote } from "../utils/local-data";

import "../styles/home.css";

function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && body.trim()) {
      addNote({ title, body });
      setTitle("");
      setBody("");
      alert("Catatan berhasil ditambahkan!");
    } else {
      alert("Judul dan isi catatan tidak boleh kosong!");
    }
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
          />
        </div>
        <div>
          <label htmlFor="body">Isi Catatan</label>
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            placeholder="Masukkan isi catatan"
          />
        </div>
        <button type="submit">Tambah Catatan</button>
      </form>
    </div>
  );
}

export default Home;
