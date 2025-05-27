import { parseFactory } from '@/utils/parse-factory'

import {
  TaskAssigneeRowModel,
  TaskAssigneeRowSchema,
  TaskAssigneeSchema
} from '../models/task_assignee.model'

import { taskAssigneeEntity } from '.'

const TaskAssigneeDataParser = parseFactory(TaskAssigneeSchema, 'TaskAssigneeDataParser')
const TaskAssigneeRowDataParser = parseFactory(TaskAssigneeRowSchema, 'TaskAssigneeRowDataParser')

const createTaskAssigneeApi = async (task_id: string, profile_id: string) => {
  const { data: duplication_data, error: duplication_err } = await taskAssigneeEntity()
    .select('id')
    .eq('task_id', task_id)
    .eq('profile_id', profile_id)

  if (duplication_err) throw duplication_err
  if (duplication_data.length) throw Error('Assignee already exists.')

  const { data, error } = await taskAssigneeEntity()
    .upsert({ task_id, profile_id })
    .select('id, profile (id, name, email, photo_url)')

  if (error) throw error
  return TaskAssigneeDataParser(data?.[0])
}

const deleteTaskAssigneeApi = async (
  task_id: string,
  profile_id: string
): Promise<TaskAssigneeRowModel> => {
  const { data, error } = await taskAssigneeEntity()
    .delete()
    .eq('task_id', task_id)
    .eq('profile_id', profile_id)
    .select()

  if (error) throw error
  return TaskAssigneeRowDataParser(data?.[0])
}

export { createTaskAssigneeApi, deleteTaskAssigneeApi }
