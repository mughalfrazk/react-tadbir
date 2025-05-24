import { parseFactory } from '@/utils/parse-factory'

import { ProjectRoleListSchema } from '../models/project_role.model'
import supabase from '../supabase'

const ProjectRoleListDataParser = parseFactory(ProjectRoleListSchema, 'ProjectRoleListDataParser')

const getAllProjectRoleListApi = async () => {
  const { data: project_roles, error } = await supabase.from('project_roles').select('*')

  if (error) throw error
  return ProjectRoleListDataParser(project_roles)
}

export { getAllProjectRoleListApi }
