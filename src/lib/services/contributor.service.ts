import { ContributorListSchema } from '@/lib/models/contributor.model'
import { parseFactory } from '@/utils/parse-factory'

import { contributorEntity, rolesEntity } from '.'

const ContributorListDataParser = parseFactory(ContributorListSchema, 'ContributorListDataParser')

const getAllContributorsApi = async (project_id: string) => {
  const { data: project_users, error } = await contributorEntity()
    .select(
      `id,
      role (id, name, description),
      profile (id, name, email, photo_url)`
    )
    .eq('project_id', project_id)

  if (error) throw error
  return ContributorListDataParser(project_users)
}

const createContributorApi = async (project_id: string, profile_id: string) => {
  const { data: role_data, error: project_roles_err } = await rolesEntity()
    .select('*')
    .eq('name', 'Contributor')

  if (!role_data?.length) throw Error('No role found.')
  if (project_roles_err) throw project_roles_err

  const { data: duplication_data, error: duplication_err } = await contributorEntity()
    .select('id')
    .eq('project_id', project_id)
    .eq('profile_id', profile_id)

  if (duplication_err) throw duplication_err
  if (duplication_data.length) throw Error('Contributor already exists.')

  const role_id = role_data?.[0]?.id
  const { error } = await contributorEntity().insert({ project_id, profile_id, role_id })
  if (error) throw error
}

const deleteContributorApi = async (project_id: string, profile_id: string) => {
  const { data: row_to_delete, error: row_error } = await contributorEntity()
    .select('*')
    .eq('project_id', project_id)
    .eq('profile_id', profile_id)

  if (row_error) throw row_error
  if (!row_to_delete.length) throw Error('Contributor not found.')

  const { error } = await contributorEntity().delete().eq('id', row_to_delete?.[0]?.id).select()

  if (error) throw error
}

export { getAllContributorsApi, createContributorApi, deleteContributorApi }
