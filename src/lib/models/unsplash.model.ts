import { z } from 'zod'

export const UnsplashPhotoSchema = z.object({
  id: z.string(),
  slug: z.string(),
  alternative_slugs: z.object({
    en: z.string(),
    es: z.string(),
    ja: z.string(),
    fr: z.string(),
    it: z.string(),
    ko: z.string(),
    de: z.string(),
    pt: z.string()
  }),
  created_at: z.string(), // ISO date string
  updated_at: z.string(), // ISO date string
  promoted_at: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  color: z.string(),
  blur_hash: z.string(),
  description: z.string(),
  alt_description: z.string(),
  breadcrumbs: z.array(z.unknown()), // empty array, could be refined if known
  urls: z.object({
    raw: z.string().url(),
    full: z.string().url(),
    regular: z.string().url(),
    small: z.string().url(),
    thumb: z.string().url(),
    small_s3: z.string().url()
  }),
  links: z.object({
    self: z.string().url(),
    html: z.string().url(),
    download: z.string().url(),
    download_location: z.string().url()
  }),
  likes: z.number(),
  liked_by_user: z.boolean(),
  current_user_collections: z.array(z.unknown()), // empty array, refine if structure is known
  sponsorship: z.null(),
  topic_submissions: z.object({
    technology: z.object({
      status: z.string(),
      approved_on: z.string()
    })
  }),
  asset_type: z.string(),
  user: z.object({
    id: z.string(),
    updated_at: z.string(),
    username: z.string(),
    name: z.string(),
    first_name: z.string(),
    last_name: z.string().nullable(),
    twitter_username: z.string().nullable(),
    portfolio_url: z.string().nullable(),
    bio: z.string().nullable(),
    location: z.string(),
    links: z.object({
      self: z.string().url(),
      html: z.string().url(),
      photos: z.string().url(),
      likes: z.string().url(),
      portfolio: z.string().url(),
      following: z.string().url(),
      followers: z.string().url()
    }),
    profile_image: z.object({
      small: z.string().url(),
      medium: z.string().url(),
      large: z.string().url()
    }),
    instagram_username: z.string(),
    total_collections: z.number(),
    total_likes: z.number(),
    total_photos: z.number(),
    total_promoted_photos: z.number(),
    total_illustrations: z.number(),
    total_promoted_illustrations: z.number(),
    accepted_tos: z.boolean(),
    for_hire: z.boolean(),
    social: z.object({
      instagram_username: z.string(),
      portfolio_url: z.string().nullable(),
      twitter_username: z.string().nullable(),
      paypal_email: z.string().nullable()
    })
  })
})

export const UnsplashPhotoListSchema = z.array(UnsplashPhotoSchema)

export const SearchPhotosResponseSchema = z.object({
  results: UnsplashPhotoListSchema,
  total: z.number(),
  total_pages: z.number()
})

export type UnsplashPhotoModel = z.infer<typeof UnsplashPhotoSchema>
export type UnsplashPhotoListModel = z.infer<typeof UnsplashPhotoListSchema>
export type SearchPhotosResponseModel = z.infer<typeof SearchPhotosResponseSchema>
