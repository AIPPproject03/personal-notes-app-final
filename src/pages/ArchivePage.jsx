import React from "react";
import {
  getArchivedNotes,
  unarchiveNote,
  deleteNote,
} from "../utils/local-data";
import CatatanCard from "../components/CatatanCard";
import { useSearchParams } from "react-router-dom";

function ArchivePage() {
  const [notes, setNotes] = React.useState(getArchivedNotes());
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleDelete = (id) => {
    deleteNote(id);
    setNotes(getArchivedNotes());
  };

  const handleUnarchive = (id) => {
    unarchiveNote(id);
    setNotes(getArchivedNotes());
  };

  return (
    <section>
      <h2>Catatan Arsip</h2>
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
