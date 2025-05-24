import { z } from 'zod'

export const CreateTaskPayloadSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  desciprion: z.string().nullish(),
  project_id: z.string(),
  parent_id: z.string().nullish(),
  column_id: z.string().nullish()
})

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  start_date: z.string().nullish(),
  end_date: z.string().nullish(),
  priority: z.boolean(),
  created_at: z.string()
})

export const TaskListSchema = z.array(TaskSchema)

export type CreateTaskPayloadModel = z.infer<typeof CreateTaskPayloadSchema>
export type TaskModel = z.infer<typeof TaskSchema>
export type TaskListModel = z.infer<typeof TaskListSchema>
