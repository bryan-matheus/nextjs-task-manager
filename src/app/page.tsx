import { TaskForm } from "@/components/task/TaskForm";
import { TaskList } from "@/components/task/TaskList";
import { TaskStoreProvider } from "@/providers/task-provider";

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto mt-10">
      <h1 className="text-xl">Task Tracker</h1>
      <TaskStoreProvider>
        <TaskForm/>
        <TaskList/>
      </TaskStoreProvider>
    </main>
  );
}
