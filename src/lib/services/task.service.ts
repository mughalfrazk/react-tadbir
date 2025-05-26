import { parseFactory } from '@/utils/parse-factory'

import { CreateTaskPayloadModel, TaskSchema } from '../models/task.model'

import { taskEntity } from '.'

const TaskDataParser = parseFactory(TaskSchema, 'TaskDataParser')

const createTaskApi = async (payload: CreateTaskPayloadModel) => {
  const { data, error } = await taskEntity().upsert(payload).select('*')
  if (error) throw error
  return TaskDataParser(data?.[0])
}

export { createTaskApi }
