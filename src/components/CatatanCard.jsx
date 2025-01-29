import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArchive, FaTrash, FaUndo } from "react-icons/fa";
import "../styles/catatan.css";

function CatatanCard({
  id,
  title,
  body,
  createdAt,
  archived,
  onArchive,
  onDelete,
  onUnarchive,
}) {
  const handleArchive = () => {
    archived ? onUnarchive(id) : onArchive(id);
  };

  const truncatedBody =
    body.length > 100 ? `${body.substring(0, 100)}...` : body;

  return (
    <div className="catatan-card">
      <div className="catatan-header">
        <Link to={`/catatan/${id}`} className="catatan-title-link">
          <h3 className="catatan-title">{title}</h3>
        </Link>
        <div className="catatan-actions">
          <button
            className="icon-button"
            onClick={handleArchive}
            aria-label={archived ? "Unarchive Note" : "Archive Note"}
          >
            {archived ? <FaUndo /> : <FaArchive />}
          </button>
          <button
            className="icon-button delete-button"
            onClick={() => onDelete(id)}
            aria-label="Delete Note"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="catatan-body">{truncatedBody}</p>
      <p className="catatan-date">
        Dibuat pada:{" "}
        {new Date(createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}

CatatanCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default CatatanCard;
