import { parseFactory } from '@/utils/parse-factory'

import { CreateTaskPayloadModel, TaskSchema, UpdateTaskPayloadModel } from '../models/task.model'

import { taskEntity } from '.'

const TaskDataParser = parseFactory(TaskSchema, 'TaskDataParser')

const createTaskApi = async (payload: CreateTaskPayloadModel) => {
  const { data, error } = await taskEntity().upsert(payload).select('*')

  if (error) throw error
  return TaskDataParser(data?.[0])
}

const updateTaskApi = async (taskId: string, payload: UpdateTaskPayloadModel) => {
  const { error } = await taskEntity().update(payload).eq('id', taskId)
  if (error) throw error
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

export { createTaskApi, updateTaskApi, switchTaskColumnApi, deleteTaskApi }
