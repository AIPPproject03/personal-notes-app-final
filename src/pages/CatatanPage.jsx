import React, { useEffect, useState } from "react";
import CatatanCard from "../components/CatatanCard";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes, deleteNote, archiveNote } from "../api/app-data";

function CatatanPage() {
  const [notes, setNotes] = useState([]);
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";

  useEffect(() => {
    async function fetchNotes() {
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
    }
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleDelete = async (id) => {
    await deleteNote(id);
    const { error, data } = await getActiveNotes();
    if (!error) {
      setNotes(data);
    }
  };

  const handleArchive = async (id) => {
    await archiveNote(id);
    const { error, data } = await getActiveNotes();
    if (!error) {
      setNotes(data);
    }
  };

  return (
    <section>
      <h2>Catatan Aktif</h2>
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <CatatanCard
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
            createdAt={note.createdAt}
            archived={note.archived}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onUnarchive={() => {}}
          />
        ))
      ) : (
        <p>Tidak ada catatan.</p>
      )}
    </section>
  );
}

export default CatatanPage;
