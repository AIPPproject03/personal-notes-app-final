import React from "react";
import { useParams, Link } from "react-router-dom";
import { getNote } from "../utils/local-data";
import "../styles/detail.css";

function DetailPage() {
  const { id } = useParams();
  const note = getNote(id);

  if (!note) {
    return <p>Catatan tidak ditemukan.</p>;
  }

  return (
    <section className="detail-page">
      <h2>{note.title}</h2>
      <p className="detail-date">
        Dibuat pada:{" "}
        {new Date(note.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="detail-body">{note.body}</p>
      <Link to="/catatan" className="back-button">
        Kembali ke Catatan
      </Link>
    </section>
  );
}

export default DetailPage;
