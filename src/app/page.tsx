"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CornerDownLeftIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <main className="w-full max-w-md mx-auto mt-10">
      <h1 className="text-xl">Task Tracker</h1>

      <form onSubmit={addTask} className="flex items-center space-x-2 my-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Start writing and press enter to create task"
          className="w-full p-2 border rounded"
        />
        <Button type="submit">
          <CornerDownLeftIcon className="h-4 w-4"/>
        </Button>
      </form>

      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center space-x-2 pl-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                id={`task-${task.id}`}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                {task.text}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              aria-label="Delete task"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </main>
  );
}
