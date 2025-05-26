import { parseFactory } from '@/utils/parse-factory'

import { ProjectRoleListSchema } from '../models/project_role.model'

import { projectRoleEntity } from '.'

const ProjectRoleListDataParser = parseFactory(ProjectRoleListSchema, 'ProjectRoleListDataParser')

const getAllProjectRoleListApi = async () => {
  const { data: project_roles, error } = await projectRoleEntity().select('*')

  if (error) throw error
  return ProjectRoleListDataParser(project_roles)
}

export { getAllProjectRoleListApi }
