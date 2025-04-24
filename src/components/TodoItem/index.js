import './index.css'

const TodoItem = props => {
  const {
    id,
    title,
    completed,
    isEditing,
    editText,
    onEditChange,
    onToggleComplete,
    onStartEditing,
    onSaveEdit,
    onDelete,
  } = props

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggleComplete(id)}
        className="todo-checkbox"
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={onEditChange}
          className="edit-input"
          data-testid="edit-input"
        />
      ) : (
        <p className="todo-title">{title}</p>
      )}

      <div className="button-group">
        {isEditing ? (
          <button
            type="button"
            className="save-button"
            data-testid="save-button"
            aria-label="Save"
            onClick={() => onSaveEdit(id)}
          >
            Save
          </button>
        ) : (
          <button
            className="edit-button"
            data-testid="edit-button"
            onClick={() => onStartEditing(id, title)}
            type="button"
          >
            Edit
          </button>
        )}
        <button
          className="delete-button"
          onClick={() => onDelete(id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
