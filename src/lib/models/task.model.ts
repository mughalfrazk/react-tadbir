import { z } from 'zod'

import { TaskTagWithTagDetailListSchema } from './tag.model'
import { TaskAssigneeListSchema } from './task_assignee.model'

export const CreateTaskPayloadSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  desciprion: z.string().nullish(),
  project_id: z.string(),
  parent_id: z.string().nullish(),
  column_id: z.string().nullish()
})

export const UpdateTaskPayloadSchema = z.object({
  title: z.string(),
  description: z.string().nullish(),
  parent_id: z.string().nullish(),
  start_date: z.string().nullish(),
  end_date: z.string().nullish(),
  priority: z.boolean().default(false),
  done: z.boolean().default(false)
})

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  start_date: z.string().nullish(),
  end_date: z.string().nullish(),
  priority: z.boolean(),
  done: z.boolean(),
  created_at: z.string()
})

export const TaskWithAssigneesSchema = TaskSchema.extend({
  task_assignee: TaskAssigneeListSchema
})

export const TaskWithAssigneeAndTagSchema = TaskWithAssigneesSchema.extend({
  task_tag: TaskTagWithTagDetailListSchema
})

export const TaskWithAssigneesListSchema = z.array(TaskWithAssigneesSchema)
export const TaskWithAssigneeAndTagListSchema = z.array(TaskWithAssigneeAndTagSchema)

export type CreateTaskPayloadModel = z.infer<typeof CreateTaskPayloadSchema>
export type UpdateTaskPayloadModel = z.infer<typeof UpdateTaskPayloadSchema>

export type TaskModel = z.infer<typeof TaskSchema>
export type TaskWithAssigneesModel = z.infer<typeof TaskWithAssigneesSchema>
export type TaskWithAssigneesListModel = z.infer<typeof TaskWithAssigneesListSchema>

export type TaskWithAssigneeAndTagModel = z.infer<typeof TaskWithAssigneeAndTagSchema>
export type TaskWithAssigneeAndTagListModel = z.infer<typeof TaskWithAssigneeAndTagListSchema>
