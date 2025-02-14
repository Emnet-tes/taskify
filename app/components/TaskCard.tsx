import React from "react";
import { useState } from "react";
import { TaskProps } from "../types";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from "./Modal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  }
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
          onClick={handleModalToggle} 
        >
          {" "}
          <FaEdit />
        </button>
        <button onClick={() => deleteTask(index)}>
          {" "}
          <MdDelete />
        </button>
      </div>
      {isModalOpen && (
          <div onClick={handleModalToggle} >
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full " onClick={(e) => e.stopPropagation}>
              <Modal isModalOpen={isModalOpen} onClose={handleModalToggle} task={task} editTask={editTask} index={index} />
            </div>
          </div>
      )}
    </li>
  );
};

export default TaskCard;
