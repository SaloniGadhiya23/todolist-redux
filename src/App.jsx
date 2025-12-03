import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <h1>Todo List App</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
