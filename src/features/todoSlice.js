import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

const todoSlice = createSlice({
  name: "todos",
  initialState: savedTodos,
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: nanoid(), text: action.payload, completed: false });
      localStorage.setItem("todos", JSON.stringify(state));
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      todo.completed = !todo.completed;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    deleteTodo: (state, action) => {
      const newState = state.filter(t => t.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    },
    clearTodos: () => {
      localStorage.removeItem("todos");
      return [];
    }
  },
});

export const { addTodo, toggleTodo, deleteTodo, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;
