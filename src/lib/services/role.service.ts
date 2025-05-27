import { parseFactory } from '@/utils/parse-factory'

import { ProjectRoleListSchema } from '../models/role.model'

import { rolesEntity } from '.'

const ProjectRoleListDataParser = parseFactory(ProjectRoleListSchema, 'ProjectRoleListDataParser')

const getAllProjectRoleListApi = async () => {
  const { data: project_roles, error } = await rolesEntity().select('*')

  if (error) throw error
  return ProjectRoleListDataParser(project_roles)
}

export { getAllProjectRoleListApi }
