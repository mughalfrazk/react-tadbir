import { z } from 'zod'

export const ProjectRoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  created_at: z.string().optional()
})

export const ProjectRoleListSchema = z.array(ProjectRoleSchema)

export type ProjectRoleModel = z.infer<typeof ProjectRoleSchema>
export type ProjectRoleListModel = z.infer<typeof ProjectRoleListSchema>
