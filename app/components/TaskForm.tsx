"use client";
import React from "react";
import { useState } from "react";
import { TaskProps } from "../types";
import { useAppDispatch } from "../lib/hooks";
import { addTask } from "../lib/features/todos/todosSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import useTheme from "../contect/ThemeContext";
import generateUniqueId from "generate-unique-id";

const TaskForm = () => {
  const {theme, toggleTheme} = useTheme();
  const id1 = generateUniqueId();
  const dispatch = useAppDispatch();
  const [newTask, setNewTask] = useState<TaskProps>({
    id: "",
    value: "",
    status: false,
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.value.trim() !== "") {
      dispatch(addTask(newTask));
      setNewTask({ value: "", status: false, id: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex  justify-around p-4 gap-2">
        <input
          type="text"
          placeholder="Add a new task"
          className=" flex w-3/4  border-2 border-gray-300 rounded p-2"
          value={newTask.value}
          onChange={(e) =>
            setNewTask({
              value: e.target.value,
              status: false,
              id: id1,
            })
          }
        />
        <button
          type="submit"
          className=" w-1/4 bg-indigo-600 text-white rounded-lg btn"
        >
          Add Task
        </button> 
        <button className={`btn ${ theme == "light" ? "bg-gray-300" : "bg-gray-700"} `} onClick={toggleTheme}>
         {theme == "dark" ? <MdOutlineDarkMode /> :<CiLight />}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
