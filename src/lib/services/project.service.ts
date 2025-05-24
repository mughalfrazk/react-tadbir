import { parseFactory } from '@/utils/parse-factory'

import {
  CreateProjectPayloadModel,
  ProjectTableItemSchema,
  ProjectTableListSchema
} from '../models/project.model'

import { projectEntity, projectRoleEntity, projectUserEntity } from '.'

const ProjectTableListDataParser = parseFactory(
  ProjectTableListSchema,
  'ProjectTableListDataParser'
)
const ProjectTableItemDataParser = parseFactory(
  ProjectTableItemSchema,
  'ProjectTableItemDataParser'
)

const createProjectApi = async (payload: CreateProjectPayloadModel) => {
  const req = {
    name: payload.name,
    description: payload.description
  }
  const { data: project_data, error: projects_err } = await projectEntity().upsert(req).select()
  if (projects_err) throw projects_err

  const { data: owner_role, error: project_roles_err } = await projectRoleEntity()
    .select('*')
    .eq('name', 'Owner')
  if (project_roles_err) throw project_roles_err

  const { data: project_user, error: project_users_err } = await projectUserEntity().insert({
    project_id: project_data?.[0]?.id,
    project_role_id: owner_role?.[0]?.id,
    user_id: payload.user_id
  })
  if (project_users_err) throw project_users_err

  return project_user
}

const getAllUserProjectsApi = async (user_id: string) => {
  const { data, error: project_users_err } = await projectUserEntity()
    .select(
      `
    id, 
    projects (id, name, description),
    project_roles (id, name, description)
    `
    )
    .eq('user_id', user_id)

  console.log('project_users_err', project_users_err)
  return ProjectTableListDataParser(data)
}

const getProjectDetailApi = async (project_id: string) => {
  const { data } = await projectUserEntity()
    .select(
      `
    id,
    projects (id, name, description, columns (*, tasks(*))),
    project_roles (id, name, description)
    `
    )
    .eq('project_id', project_id)

  return ProjectTableItemDataParser(data?.[0])
}

export { createProjectApi, getAllUserProjectsApi, getProjectDetailApi }
