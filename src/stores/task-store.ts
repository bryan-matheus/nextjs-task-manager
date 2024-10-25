import { nanoid } from 'nanoid'
import { createStore } from 'zustand/vanilla'

export type Task = {
  id: string
  text: string
  completed: boolean
}

export type TaskState = {
  tasks: Task[]
}

export type TaskActions = {
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

export type TaskStore = TaskState & TaskActions

export const initTaskStore = (): TaskState => {
  return { tasks: [] }
}

export const defaultInitState: TaskState = {
  tasks: [],
}

export const createTaskStore = (
  initState: TaskState = defaultInitState,
) => {
  return createStore<TaskStore>()((set) => ({
    ...initState,
    addTask: (text) =>
      set((state) => ({
        tasks: [
          ...state.tasks,
          {
            id: nanoid(),
            text,
            completed: false,
          },
        ],
      })),

    toggleTask: (id) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ),
      })),

    removeTask: (id) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
  }))
}
