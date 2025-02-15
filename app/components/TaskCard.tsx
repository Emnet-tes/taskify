import React from "react";
import { useState } from "react";
import { TaskCardProps } from "../types";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from "./Modal";
import { useAppDispatch } from "../lib/hooks";
import { toggleStatus, deleteTask } from "../lib/features/todos/todosSlice";
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {

  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // handle modal toggle
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  // handle delete task
  const handleDelete = () => {
    setIsDeleting(!isDeleting);
    setTimeout(() => {
      dispatch(deleteTask(task.id));
    }, 1000);
  };

  return (
    <li
      className={`list-group-item flex justify-between border-2 border-gray-200 p-4 mb-2 rounded-lg animate-bounce animate-twice animate-ease-in-out ${
        isDeleting
          ? "animate-jump-out animate-duration-1000 animate-ease-in-out"
          : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <button onClick={() => dispatch(toggleStatus(task.id))}>
          {task.status == true ? <IoIosCheckbox /> : <MdCheckBoxOutlineBlank />}
        </button>

        <span className="truncate md:max-w-lg max-w-40">{task.value}</span>
      </div>
      <div className="flex gap-6">
        <button onClick={handleModalToggle}>
          <FaEdit />
        </button>
        <button onClick={() => handleDelete()}>
          <MdDelete />
        </button>
      </div>
      {isModalOpen && (
        <div onClick={handleModalToggle}>
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full "
            onClick={(e) => e.stopPropagation}
          >
            <Modal
              isModalOpen={isModalOpen}
              onClose={handleModalToggle}
              task={task}
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskCard;
