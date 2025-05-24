import { CreateTaskPayloadModel } from '../models/task.model'

import { taskEntity } from '.'

const createTaskApi = async (payload: CreateTaskPayloadModel) => {
  const { error } = await taskEntity().insert(payload)
  if (error) throw error
}

export { createTaskApi }
