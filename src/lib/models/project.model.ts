import { z } from 'zod'

import { ColumnListSchema } from './column.model'

export const CreateProjectPayloadSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().nullish(),
  profile_id: z.string()
})

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish()
})

export const ProjectWithColumnsSchema = ProjectSchema.extend({
  column: ColumnListSchema
})

export const ProjectListSchema = z.array(ProjectSchema)

export const ProjectDetailSchema = z.object({
  id: z.number(),
  project: ProjectWithColumnsSchema,
  role: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string()
  })
})

export const ProjectTableItemSchema = z.object({
  id: z.number(),
  project: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string()
  }),
  role: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string()
  })
})

export const ProjectTableListSchema = z.array(ProjectTableItemSchema)

export type CreateProjectPayloadModel = z.infer<typeof CreateProjectPayloadSchema>
export type ProjectModel = z.infer<typeof ProjectSchema>
export type ProjectListModel = z.infer<typeof ProjectListSchema>
export type ProjectWithColumnsModel = z.infer<typeof ProjectWithColumnsSchema>

export type ProjectDetailModel = z.infer<typeof ProjectDetailSchema>
export type ProjectTableItemModel = z.infer<typeof ProjectTableItemSchema>
export type ProjectTableListModel = z.infer<typeof ProjectTableListSchema>
