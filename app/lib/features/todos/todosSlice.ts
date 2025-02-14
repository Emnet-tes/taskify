import { TaskProps } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { tasks: TaskProps[] } = {
  tasks: [],
};

const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return;
      state.tasks[taskIndex] = updatedTask;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleStatus: (state, action) => {
      const id = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      state.tasks[taskIndex].status = !state.tasks[taskIndex].status;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { setTasks, addTask, editTask, deleteTask, toggleStatus } =
  todosSlice.actions;
export default todosSlice.reducer;
