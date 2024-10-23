import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "./Redux/todoSlice";

function App() {
  const [task, setTask] = useState("");

  const dispatch = useDispatch();
  const { list, status: fetchStatus } = useSelector((state) => state.todos);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchTodos());
    }
  }, [fetchStatus, dispatch]);

  const handleAddTodo = () => {
    if (task.trim()) {
      dispatch(addTodo({ Task: task, Status: false }));
      setTask("");
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Todo List</h2>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />

        <button onClick={handleAddTodo}>Add Todo</button>

        <ul>
          {list.map((todo) => (
            <li key={todo._id}>
              <span>{todo.Task}</span>
              <input
                type="checkbox"
                checked={todo.Status}
                onChange={() => dispatch(toggleTodo(todo._id))}
              />
              <button onClick={() => dispatch(deleteTodo(todo._id))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
