import supabase from '../supabase'

const profileEntity = () => supabase.from('profiles')
const projectEntity = () => supabase.from('projects')
const projectUserEntity = () => supabase.from('project_users')
const projectRoleEntity = () => supabase.from('project_roles')
const columnEntity = () => supabase.from('columns')
const taskEntity = () => supabase.from('tasks')
const taskAssigneeEntity = () => supabase.from('task_assignees')

export {
  profileEntity,
  projectEntity,
  projectUserEntity,
  projectRoleEntity,
  columnEntity,
  taskEntity,
  taskAssigneeEntity
}
