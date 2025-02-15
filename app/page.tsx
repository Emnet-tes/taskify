"use client";
import Image from "next/image";
import TaskList from "./components/TaskList";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "./contect/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <div className=" flex w-full h-screen justify-between p-8 md:p-12 gap-2">
          <TaskList />
          <Image
            src="/todo.svg"
            alt="To Do List"
            className="hidden md:block w-1/2"
            width={500}
            height={500}
          />
        </div>
      </StoreProvider>
    </ThemeProvider>
  );
}
