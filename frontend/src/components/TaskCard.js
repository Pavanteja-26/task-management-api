import React from 'react';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in_progress':
        return '#3b82f6';
      case 'pending':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const formatStatus = (status) => {
    return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span className="badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
            {task.priority}
          </span>
          <span className="badge" style={{ backgroundColor: getStatusColor(task.status) }}>
            {formatStatus(task.status)}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-meta">
        <small>Created: {new Date(task.created_at).toLocaleDateString()}</small>
        {task.user_name && <small>By: {task.user_name}</small>}
      </div>
      
      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="btn btn-sm btn-edit">
          ✏️ Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="btn btn-sm btn-delete">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
