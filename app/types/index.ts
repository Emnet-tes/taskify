export interface TaskProps {
  id: string;
  value: string;
  status: boolean;
}

export interface TaskCardProps {
  task: TaskProps;
}

export interface TaskFormProps {
  addTask: (task: TaskProps) => void;
}

export interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  task: TaskProps;
}
