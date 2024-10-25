'use client'

import { useTaskStore } from "@/providers/task-provider"
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

export function TaskList() {
  const {tasks, removeTask, toggleTask} = useTaskStore(state => state);

  return (
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
            onClick={() => removeTask(task.id)}
            aria-label="Delete task"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  )
}
