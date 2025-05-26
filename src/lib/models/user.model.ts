import { z } from 'zod'

export type UserDocument = {
  id: string
  displayName: string
  email: string
  role: string
}

export const UserProfileSchema = z.object({
  uid: z.string(),
  name: z.string(),
  granted_scopes: z.string(),
  id: z.string(),
  verified_email: z.boolean(),
  given_name: z.string(),
  family_name: z.string(),
  email: z.string(),
  picture: z.string(),
  accessToken: z.string()
})

export const ProfileSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  photo_url: z.string().nullish()
})

export const ProfileListSchema = z.array(ProfileSchema)

export type UserProfileModel = z.infer<typeof UserProfileSchema>
export type ProfileListModel = z.infer<typeof ProfileListSchema>
