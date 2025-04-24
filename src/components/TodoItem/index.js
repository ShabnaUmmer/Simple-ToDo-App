// Write your code here
import './index.css'

const TodoItem = props => {
  const {id, title, deleteTodo} = props

  const onDelete = () => {
    deleteTodo(id)
  }

  return (
    <li className="todo-item">
      <p className="todo-title">{title}</p>
      <button className="button" type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
