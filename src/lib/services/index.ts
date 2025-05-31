import supabase from '../supabase'

const profileEntity = () => supabase.from('profile')
const projectEntity = () => supabase.from('project')
const contributorEntity = () => supabase.from('contributor')
const rolesEntity = () => supabase.from('role')
const columnEntity = () => supabase.from('column')
const taskEntity = () => supabase.from('task')
const taskAssigneeEntity = () => supabase.from('task_assignee')
const tagEntity = () => supabase.from('tag')
const taskTagEntity = () => supabase.from('task_tag')

export {
  profileEntity,
  projectEntity,
  contributorEntity,
  rolesEntity,
  columnEntity,
  taskEntity,
  taskAssigneeEntity,
  tagEntity,
  taskTagEntity
}
