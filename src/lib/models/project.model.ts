import { z } from 'zod'

import { ColumnListSchema } from './column.model'

export const CreateProjectPayloadSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().nullish(),
  user_id: z.string()
})

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish()
})

export const ProjectListSchema = z.array(ProjectSchema)

export const ProjectTableItemSchema = z.object({
  id: z.number(),
  projects: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    columns: ColumnListSchema
  }),
  project_roles: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string()
  })
})

export const ProjectTableListSchema = z.array(ProjectTableItemSchema)

export type CreateProjectPayloadModel = z.infer<typeof CreateProjectPayloadSchema>
export type ProjectModel = z.infer<typeof ProjectSchema>
export type ProjectListModel = z.infer<typeof ProjectListSchema>

export type ProjectTableItemModel = z.infer<typeof ProjectTableItemSchema>
export type ProjectTableListModel = z.infer<typeof ProjectTableListSchema>
