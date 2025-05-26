import { z } from 'zod'

export const ContributorSchema = z.object({
  id: z.number(),
  profiles: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    photo_url: z.string().nullish()
  }),
  project_roles: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string()
  })
})

export const ContributorListSchema = z.array(ContributorSchema)

export const ContributorModel = z.array(ContributorSchema)
export const ContributorListModel = z.array(ContributorListSchema)
