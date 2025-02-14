import React from "react";
import { TaskProps } from "../types";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
interface TaskCardProps {
  task: TaskProps;
  index: number;
  editTask: (index: number, task: TaskProps) => void;
  deleteTask: (index: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  editTask,
  deleteTask,
}) => {
  return (
    <li className="list-group-item flex justify-between border-2 border-gray-200 p-4 mb-2 rounded-lg ">
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            editTask(index, {
              ...task,
              status: task.status == "completed" ? "pending" : "completed",
            })
          }
        >
          {task.status == "completed" ? (
            <IoIosCheckbox />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </button>

        <span>{task.value}</span>
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => {
            const newValue = prompt("Edit task", task.value);
            if (newValue !== null) {
              editTask(index, { ...task, value: newValue });
            }
          }}
        >
          {" "}
          <FaEdit />
        </button>
        <button onClick={() => deleteTask(index)}>
          {" "}
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default TaskCard;
