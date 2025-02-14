"use client";
import React from "react";
import { useState } from "react";
import { TaskProps } from "../types";

interface TaskFormProps {
  addTask: (task: TaskProps) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const generateUniqueId = require("generate-unique-id");
  const [newTask, setNewTask] = useState<TaskProps>({
    id: "",
    value: "",
    status: "pending",

  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.value.trim() !== "") {
      addTask(newTask);
      const id1 = generateUniqueId();
      setNewTask({ value: "", status: "pending" , id : id1});
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex  justify-around p-4 gap-2">
        <input
          type="text"
          placeholder="Add a new task"
          className=" flex w-3/4  border-2 border-gray-300 rounded p-2"
          value={newTask.value}
          onChange={(e) =>
            setNewTask({ value: e.target.value, status: "pending" , id : newTask.id })
          }
        />
        <button
          type="submit"
          className=" w-1/4 bg-indigo-600 text-white rounded-lg text-sm"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
