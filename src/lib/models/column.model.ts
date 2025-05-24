import { z } from 'zod'

import { TaskListSchema } from './task.model'

export const CreateColumnPayloadSchema = z.object({
  name: z.string().min(1, 'Column name is required'),
  sort: z.string(),
  project_id: z.string()
})

export const ColumnSchema = z.object({
  id: z.string(),
  name: z.string(),
  sort: z.number(),
  project_id: z.number(),
  created_at: z.string(),
  tasks: TaskListSchema
})

export const ColumnListSchema = z.array(ColumnSchema)

export type CreateColumnPayloadModel = z.infer<typeof CreateColumnPayloadSchema>
export type ColumnModel = z.infer<typeof ColumnSchema>
export type ColumnListModel = z.infer<typeof ColumnListSchema>
