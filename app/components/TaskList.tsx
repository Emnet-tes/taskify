"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { TaskProps } from "../types";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import { IoFilter } from "react-icons/io5";
const TaskList = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  // get tasks from local storage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // store tasks in local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  function addTask(task: TaskProps) {
    setTasks([...tasks, task]);
  }
  // Edit a task
  function editTask(id: string, updatedTask: TaskProps) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task);
      setTasks(updatedTasks);
  }
  // Delete a task
  function deleteTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return task.status === "pending";
    if (filter === "completed") return task.status === "completed";
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
      <TaskForm addTask={addTask} />
      <div className="flex justify-between">
        <h3 className=" text-lg font-bold">Task List</h3>
        <details className="dropdown" ref={dropdownRef}>
          <summary className="btn m-1">
            {filter}
            <IoFilter />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-fit p-2 shadow">
            <li>
              <button onClick={() => handleFilterSelection("all")}>All</button>
            </li>
            <li>
              <button onClick={() => handleFilterSelection("pending")}>Pending</button>
            </li>
            <li>
              <button onClick={() => handleFilterSelection("completed")}>Completed</button>
            </li>
          </ul>
        </details>
      </div>

      <ul className="list-group list-none">
        {filteredTasks.map((task, index) => (
          // Pass the task, index, editTask, and deleteTask functions as props to the TaskCard component
          <TaskCard
            key={index}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
