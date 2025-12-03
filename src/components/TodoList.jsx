import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, clearTodos } from "../features/todoSlice";
import { useState } from "react";

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const [removing, setRemoving] = useState(null); // id of todo being removed

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const handleDelete = (id) => {
    setRemoving(id); // trigger fade-out animation
    setTimeout(() => dispatch(deleteTodo(id)), 300); // wait for animation
  };

  return (
    <div className="todo-list">
      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter==="all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("completed")} className={filter==="completed" ? "active" : ""}>Completed</button>
        <button onClick={() => setFilter("pending")} className={filter==="pending" ? "active" : ""}>Pending</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className={`${todo.completed ? "completed" : ""} ${removing === todo.id ? "fade-out" : ""}`}
          >
            <span onClick={() => dispatch(toggleTodo(todo.id))}>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <button className="clear-btn" onClick={() => dispatch(clearTodos())}>Clear All</button>
      )}
    </div>
  );
}
