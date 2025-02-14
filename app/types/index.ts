export interface TaskProps {
    id : string;
    value : string;
    status : "pending" | "completed";
}

export interface TaskCardProps {
  task: TaskProps;
  editTask: (id:string, task: TaskProps) => void;
  deleteTask: (id: string) => void;
}

export interface TaskFormProps {
  addTask: (task: TaskProps) => void;
}

export interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  task: TaskProps;
  editTask: (id: string, task: TaskProps) => void;
}