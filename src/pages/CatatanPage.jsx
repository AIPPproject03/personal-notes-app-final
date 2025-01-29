import React from "react";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/local-data";
import CatatanCard from "../components/CatatanCard";
import { useSearchParams } from "react-router-dom";

function CatatanPage() {
  const [notes, setNotes] = React.useState(getActiveNotes());
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleDelete = (id) => {
    deleteNote(id);
    setNotes(getActiveNotes());
  };

  const handleArchive = (id) => {
    archiveNote(id);
    setNotes(getActiveNotes());
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
