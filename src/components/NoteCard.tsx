import React from 'react';

import "bootstrap-icons/font/bootstrap-icons.css";
import './note-card.css';

interface NoteCardProps {
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, onEdit, onDelete }) => {
  return (
    <div className="card fixed-height-card" style={{ width: '100%' }}>
      <div className="card-body">
        <h5 className="card-title">{title || "Untitled Note"}</h5>
        <p className="card-text ellipsis">{content}</p>
        <div className="button-group">
          <button className="btn btn-primary btn-sm me-2" onClick={onEdit} aria-label="Edit">
            <i className="bi bi-pencil-fill fs-8"></i>
          </button>
          <button className="btn btn-danger btn-sm" onClick={onDelete} aria-label="Delete">
            <i className="bi bi-trash-fill fs-8"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;