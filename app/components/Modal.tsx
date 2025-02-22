import React from "react";
import { ModalProps, TaskProps } from "../types";
import { IoIosCloseCircle } from "react-icons/io";
import { editTask } from "../lib/features/todos/todosSlice";
import { useAppDispatch } from "../lib/hooks";
const Modal = ({ isModalOpen, onClose, task }: ModalProps) => {
  const [newTask, setNewTask] = React.useState<TaskProps>(task);
  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(editTask({ id: task.id, updatedTask: newTask }));

    onClose();
  }

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black bg-opacity-50"
      onClick={onClose} // Closes modal when clicking outside
    >
      <div
        className="relative w-full max-w-lg p-8 rounded-3xl shadow-xl bg-white"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-2 text-gray-600 hover:text-red-500 transition"
          onClick={onClose}
        >
          <IoIosCloseCircle size={28} />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Edit task"
              className="w-full border-2 border-gray-300 rounded p-2"
              value={newTask.value}
              onChange={(e) =>
                setNewTask({
                  value: e.target.value,
                  status: newTask.status,
                  id: task.id,
                })
              }
              autoFocus
            />
            <button
              type="submit"
              className="p-3 bg-indigo-600 text-white rounded text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
