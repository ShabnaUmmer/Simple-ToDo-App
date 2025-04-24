import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    completed: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    completed: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    completed: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    completed: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    completed: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    completed: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    completed: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    completed: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    newTodoTitle: '',
    editingId: null,
    editText: '',
  }

  handleInputChange = event => {
    this.setState({newTodoTitle: event.target.value})
  }

  handleEditChange = event => {
    this.setState({editText: event.target.value})
  }

  addTodo = () => {
    const {newTodoTitle, todosList} = this.state
    const trimmedTitle = newTodoTitle.trim()
    if (trimmedTitle === '') return

    const words = trimmedTitle.split(' ')
    const lastWord = words[words.length - 1]
    const count = parseInt(lastWord, 10)

    if (!Number.isNaN(count) && words.length > 1) {
      const baseTitle = words.slice(0, -1).join(' ')
      const newTodos = Array.from({length: count}, (_, i) => ({
        id: todosList.length + 1 + i,
        title: `${baseTitle} ${i + 1}`,
        completed: false,
      }))
      this.setState({
        todosList: [...todosList, ...newTodos],
        newTodoTitle: '',
      })
    } else {
      const newTodo = {
        id: todosList.length + 1,
        title: trimmedTitle,
        completed: false,
      }
      this.setState({
        todosList: [...todosList, newTodo],
        newTodoTitle: '',
      })
    }
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    }))
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  startEditing = (id, title) => {
    this.setState({editingId: id, editText: title})
  }

  saveEdit = id => {
    const {editText} = this.state
    if (editText.trim() === '') return

    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: prevState.editText} : todo,
      ),
      editingId: null,
      editText: '',
    }))
  }

  render() {
    const {todosList, newTodoTitle, editingId, editText} = this.state

    return (
      <div className="bg-container">
        <div className="todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo-container">
            <input
              type="text"
              value={newTodoTitle}
              onChange={this.handleInputChange}
              placeholder="Enter todo (add number at end for multiple)"
              className="todo-input"
            />
            <button type="button" className="add-button" onClick={this.addTodo}>
              Add
            </button>
          </div>
          <ul className="todo-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                isEditing={editingId === todo.id}
                editText={editText}
                onEditChange={this.handleEditChange}
                onToggleComplete={this.toggleComplete}
                onStartEditing={this.startEditing}
                onSaveEdit={this.saveEdit}
                onDelete={this.deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
