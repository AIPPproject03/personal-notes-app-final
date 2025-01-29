import React from "react";
import CatatanCard from "./CatatanCard";
import PropTypes from "prop-types";

function CatatanList({ notes }) {
  return (
    <div className="catatan-list">
      {notes.length > 0 ? (
        notes.map((note) => (
          <CatatanCard
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
            createdAt={note.createdAt}
            archived={note.archived}
          />
        ))
      ) : (
        <p>Tidak ada catatan.</p>
      )}
    </div>
  );
}

CatatanList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default CatatanList;
