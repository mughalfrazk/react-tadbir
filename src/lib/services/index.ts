import supabase from '../supabase'

const projectEntity = () => supabase.from('projects')
const projectUserEntity = () => supabase.from('project_users')
const projectRoleEntity = () => supabase.from('project_roles')
const columnEntity = () => supabase.from('columns')
const taskEntity = () => supabase.from('tasks')

export { projectEntity, projectUserEntity, projectRoleEntity, columnEntity, taskEntity }
