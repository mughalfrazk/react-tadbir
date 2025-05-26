import { parseFactory } from '@/utils/parse-factory'

import {
  TaskAssigneeRowModel,
  TaskAssigneeRowSchema,
  TaskAssigneeSchema
} from '../models/task_assignee.model'

import { taskAssigneeEntity } from '.'

const TaskAssigneeDataParser = parseFactory(TaskAssigneeSchema, 'TaskAssigneeDataParser')
const TaskAssigneeRowDataParser = parseFactory(TaskAssigneeRowSchema, 'TaskAssigneeRowDataParser')

const createTaskAssigneeApi = async (task_id: string, user_id: string) => {
  const { data: duplication_data, error: duplication_err } = await taskAssigneeEntity()
    .select('id')
    .eq('task_id', task_id)
    .eq('user_id', user_id)

  if (duplication_err) throw duplication_err
  if (duplication_data.length) throw Error('Assignee already exists.')

  const { data, error } = await taskAssigneeEntity().upsert({ task_id, user_id }).select('*')

  if (error) throw error
  return TaskAssigneeDataParser(data)
}

const deleteTaskAssigneeApi = async (
  task_id: string,
  user_id: string
): Promise<TaskAssigneeRowModel> => {
  const { data, error } = await taskAssigneeEntity()
    .delete()
    .eq('task_id', task_id)
    .eq('user_id', user_id)
    .select()

  if (error) throw error
  return TaskAssigneeRowDataParser(data)
}

export { createTaskAssigneeApi, deleteTaskAssigneeApi }
