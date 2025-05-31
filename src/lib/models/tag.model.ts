import { z } from 'zod'

export const CreateTagPayloadSchema = z.object({
  name: z.string(),
  color: z.string(),
  project_id: z.number()
})

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  project_id: z.number(),
  created_at: z.string()
})

export const TagListSchema = z.array(TagSchema)

export const TaskTagSchema = z.object({
  id: z.number(),
  tag_id: z.number(),
  task_id: z.string(),
  created_ad: z.string().nullish()
})

export const TaskTagListSchema = z.array(TaskTagSchema)

export const TaskTagWithTagDetailSchema = z.object({
  id: z.number(),
  tag: z.object({
    id: z.number(),
    name: z.string(),
    color: z.string()
  })
})

export const TaskTagWithTagDetailListSchema = z.array(TaskTagWithTagDetailSchema)

export type CreateTagPayloadModel = z.infer<typeof CreateTagPayloadSchema>
export type TagModel = z.infer<typeof TagSchema>
export type TagListModel = z.infer<typeof TagListSchema>

export type TaskTagModel = z.infer<typeof TaskTagSchema>
export type TaskTagListModel = z.infer<typeof TaskTagListSchema>

export type TaskTagWithTagDetailModel = z.infer<typeof TaskTagWithTagDetailSchema>
export type TaskTagWithTagDetailListModel = z.infer<typeof TaskTagWithTagDetailListSchema>
