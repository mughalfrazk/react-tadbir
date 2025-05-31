import { parseFactory } from '@/utils/parse-factory'

import {
  CreateProjectPayloadModel,
  ProjectDetailSchema,
  ProjectTableListSchema
} from '../models/project.model'

import { contributorEntity, projectEntity, rolesEntity } from '.'

const ProjectTableListDataParser = parseFactory(
  ProjectTableListSchema,
  'ProjectTableListDataParser'
)
const ProjectDetailDataParser = parseFactory(ProjectDetailSchema, 'ProjectDetailDataParser')

const createProjectApi = async (payload: CreateProjectPayloadModel) => {
  const req = {
    name: payload.name,
    description: payload.description
  }
  const { data: project_data, error: projects_err } = await projectEntity().upsert(req).select()
  if (projects_err) throw projects_err

  const { data: owner_role, error: project_roles_err } = await rolesEntity()
    .select('*')
    .eq('name', 'Owner')
  if (project_roles_err) throw project_roles_err

  const { data: project_user, error: project_users_err } = await contributorEntity().insert({
    project_id: project_data?.[0]?.id,
    role_id: owner_role?.[0]?.id,
    profile_id: payload.profile_id
  })
  if (project_users_err) throw project_users_err

  return project_user
}

const getUserProjectListApi = async (profile_id: string) => {
  const { data, error: project_users_err } = await contributorEntity()
    .select(
      `
    id, 
    project (id, name, description),
    role (id, name, description)
    `
    )
    .eq('profile_id', profile_id)

  console.log('project_users_err', project_users_err)
  return ProjectTableListDataParser(data)
}

const getProjectDetailApi = async (project_id: string, profile_id: string) => {
  const { data } = await contributorEntity()
    .select(
      `
    id,
    project (id, name, description, 
      column (*, 
        task(*, 
          task_assignee (id, profile (id, name, email, photo_url)), 
          task_tag (id, tag (id, name, color))
        )
      )
    ),
    role (id, name, description)
    `
    )
    .eq('project_id', project_id)
    .eq('profile_id', profile_id)

  return ProjectDetailDataParser(data?.[0])
}

export { createProjectApi, getUserProjectListApi, getProjectDetailApi }
