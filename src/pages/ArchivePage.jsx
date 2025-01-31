import React, { useEffect, useState } from "react";
import CatatanCard from "../components/CatatanCard";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../api/app-data";

function ArchivePage() {
  const [notes, setNotes] = useState([]);
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const { data } = await getArchivedNotes();
      setNotes(data);
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleUnarchive = async (id) => {
    await unarchiveNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <section>
      <h2>Catatan Arsip</h2>
      {loading ? (
        <p>Memuat catatan...</p>
      ) : filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <CatatanCard
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
            createdAt={note.createdAt}
            archived={note.archived}
            onDelete={handleDelete}
            onArchive={() => {}}
            onUnarchive={handleUnarchive}
          />
        ))
      ) : (
        <p>Tidak ada catatan di arsip.</p>
      )}
    </section>
  );
}

export default ArchivePage;
