import React, { use } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <li className="list-group-item flex justify-between border-2 border-gray-200 p-4 mb-2 rounded-lg ">
      <div className="flex items-center gap-2">
        <button onClick={() => dispatch(toggleStatus(task.id))}>
          {task.status == true ? <IoIosCheckbox /> : <MdCheckBoxOutlineBlank />}
        </button>

        <span>{task.value}</span>
      </div>
      <div className="flex gap-6">
        <button onClick={handleModalToggle}>
          <FaEdit />
        </button>
        <button onClick={() => dispatch(deleteTask(task.id))}>
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
