import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/todo";
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(BASE_URL);
  console.log(response);

  return response.data;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ Task, Status }) => {
    const response = await axios.post(BASE_URL, {
      Task,
      Status,
    });
    return response.data;
  }
);

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (id) => {
  const response = await axios.put(`${BASE_URL}/${id}`, {
    Status: true,
  });
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`http://localhost:4000/api/todo/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: { list: [], status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
