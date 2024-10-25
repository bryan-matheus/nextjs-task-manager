"use client"

import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { FormField } from "../ui/form";
import { Button } from "../ui/button";
import { CornerDownLeftIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTaskStore } from "@/providers/task-provider";

const formSchema = z.object({
  text: z.string().min(2, {
    message: "Text must be at least 2 characters.",
  }),
})

export function TaskForm() {
  const {addTask} = useTaskStore(state => state)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTask(values.text);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2 my-4">
        <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Start writing and press enter to create task"
                className="w-full p-2 border rounded" {...field}/>
            )}/>
        <Button type="submit">
          <CornerDownLeftIcon className="h-4 w-4"/>
        </Button>
      </form>
    </Form>
  )
}
