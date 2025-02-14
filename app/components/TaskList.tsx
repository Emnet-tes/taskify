"use client";
import React from "react";
import { useState, useEffect } from "react";
import { TaskProps } from "../types";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
const TaskList = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
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
  function editTask(index: number, task: TaskProps) {
    const newTasks = [...tasks];
    newTasks[index] = task;
    setTasks(newTasks);
  }
  // Delete a task
  function deleteTask(index: number) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-center text-2xl font-bold">Task List</h2>
      {/* form to accept task */}
      <TaskForm addTask={addTask} />
      <ul className="list-group list-none">
        {tasks.map((task, index) => (
          // Pass the task, index, editTask, and deleteTask functions as props to the TaskCard component
          <TaskCard
            key={index}
            index={index}
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
