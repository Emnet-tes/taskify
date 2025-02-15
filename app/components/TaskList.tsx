"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import { IoFilter } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setTasks } from "../lib/features/todos/todosSlice";
import useTheme from "../contect/ThemeContext";
const TaskList = () => {
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.todo.tasks);
  const [filter, setFilter] = useState<string>("all");
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  // get tasks from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      dispatch(setTasks(JSON.parse(storedTasks)));
    }}
  }, [dispatch]);

  // filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return task.status === false;
    if (filter === "completed") return task.status === true;
    return true;
  });

  // Handle filter selection and close dropdown
  function handleFilterSelection(selectedFilter: string) {
    setFilter(selectedFilter);
    if (dropdownRef.current) {
      dropdownRef.current.open = false; // Close the dropdown
    }
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-center text-2xl font-bold">Taskify</h2>
      {/* form to accept task */}
      <TaskForm />
      <div className="flex justify-between">
        <h3 className=" text-lg font-bold">Task List</h3>
        <details className="dropdown" ref={dropdownRef}>
          <summary className={`btn m-1 ${theme == "light" ?" bg-gray-300 ":"bg-gray-700"}   `}>
            {filter}
            <IoFilter />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-fit p-2 shadow">
            <li>
              <button onClick={() => handleFilterSelection("all")}>All</button>
            </li>
            <li>
              <button onClick={() => handleFilterSelection("pending")}>
                Pending
              </button>
            </li>
            <li>
              <button onClick={() => handleFilterSelection("completed")}>
                Completed
              </button>
            </li>
          </ul>
        </details>
      </div>
      <ul className="list-group list-none ">
        {filteredTasks.map((task, index) => (
          // Pass the task as props to the TaskCard component
          <TaskCard key={index} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
