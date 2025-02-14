import Image from "next/image";
import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <div className="flex w-full h-screen justify-between p-8 md:p-12">
      <TaskList />
      <Image
        src="/todolist.svg"
        alt="To Do List"
        className="hidden md:block w-1/2"
        width={500}
        height={500}
      />
    </div>
  );
}
