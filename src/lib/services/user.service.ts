import { parseFactory } from '@/utils/parse-factory'

import { ProfileListSchema } from '../models/user.model'

import { profileEntity } from '.'

const ProfileListDataParser = parseFactory(ProfileListSchema, 'ProfileListDataParser')

const searchUserToAddApi = async (text: string, existingContributorIds: string[]) => {
  const ids = `(${existingContributorIds.join(',')})`
  const { data: users } = await profileEntity()
    .select('*')
    .like('email', `%${text}%`)
    .not('id', 'in', ids)

  return ProfileListDataParser(users)
}

export { searchUserToAddApi }
