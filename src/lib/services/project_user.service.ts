import { ContributorListSchema } from '@/lib/models/project_user.model'
import { parseFactory } from '@/utils/parse-factory'

import { projectRoleEntity, projectUserEntity } from '.'

const ContributorListDataParser = parseFactory(ContributorListSchema, 'ContributorListDataParser')

const getAllContributorsApi = async (project_id: string) => {
  const { data: project_users, error } = await projectUserEntity()
    .select(
      `id,
      project_roles (id, name, description),
      profiles (id, name, email, photo_url)`
    )
    .eq('project_id', project_id)

  if (error) throw error
  return ContributorListDataParser(project_users)
}

const createContributorApi = async (project_id: string, user_id: string) => {
  const { data: project_roles, error: project_roles_err } = await projectRoleEntity()
    .select('*')
    .eq('name', 'Contributor')

  if (!project_roles?.length) throw Error('No role found.')
  if (project_roles_err) throw project_roles_err

  const { data: duplication_data, error: duplication_err } = await projectUserEntity()
    .select('id')
    .eq('project_id', project_id)
    .eq('user_id', user_id)

  if (duplication_err) throw duplication_err
  if (duplication_data.length) throw Error('Contributor already exists.')

  const project_role_id = project_roles?.[0]?.id
  const { error } = await projectUserEntity().insert({ project_id, user_id, project_role_id })
  if (error) throw error
}

const deleteContributorApi = async (project_id: string, user_id: string) => {
  const { data: row_to_delete, error: row_error } = await projectUserEntity()
    .select('*')
    .eq('project_id', project_id)
    .eq('user_id', user_id)

  if (row_error) throw row_error
  if (!row_to_delete.length) throw Error('Contributor not found.')

  const { data, error } = await projectUserEntity()
    .delete()
    .eq('id', row_to_delete?.[0]?.id)
    .select()

  console.log(data)
  if (error) throw error
}

export { getAllContributorsApi, createContributorApi, deleteContributorApi }
