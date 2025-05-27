import { parseFactory } from '@/utils/parse-factory'

import { CreateTaskPayloadModel, TaskSchema } from '../models/task.model'

import { taskEntity } from '.'

const TaskDataParser = parseFactory(TaskSchema, 'TaskDataParser')

const createTaskApi = async (payload: CreateTaskPayloadModel) => {
  const { data, error } = await taskEntity().upsert(payload).select('*')
  if (error) throw error
  return TaskDataParser(data?.[0])
}

const switchTaskColumnApi = async (task_id: string, column_id: string) => {
  const { data, error } = await taskEntity().update({ column_id }).eq('id', task_id).select()

  if (error) throw error
  return data
}

const deleteTaskApi = async (task_id: string) => {
  const { data, error } = await taskEntity().delete().eq('id', task_id)

  if (error) throw error
  return data
}

export { createTaskApi, switchTaskColumnApi, deleteTaskApi }
