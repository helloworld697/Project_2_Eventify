import React from 'react';
import './EventCard.css';

export function EventCard({ 
  id, 
  title, 
  date, 
  description, 
  onClick,
  onDelete,
  canDelete
}) {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <h3>{title}</h3>
        <span className="event-date">{date}</span>
      </div>
      <p className="event-description">{description}</p>
      <div className="event-footer">
        <button className="btn-view" onClick={onClick}>View Details</button>
        {canDelete && (
          <button 
            className="btn-delete"
            onClick={handleDeleteClick}
            title="Delete event"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
