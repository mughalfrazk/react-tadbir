import { z } from 'zod'

import { ProfileSchema } from './user.model'

export const TaskAssigneeSchema = z.object({
  id: z.number(),
  profiles: ProfileSchema
})

export const TaskAssigneeRowSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  task_id: z.string(),
  user_id: z.string()
})

export const TaskAssigneeListSchema = z.array(TaskAssigneeSchema)

export type TaskAssigneeModel = z.infer<typeof TaskAssigneeSchema>
export type TaskAssigneeListModel = z.infer<typeof TaskAssigneeListSchema>
export type TaskAssigneeRowModel = z.infer<typeof TaskAssigneeRowSchema>
