import { CreateColumnPayloadModel } from '../models/column.model'

import { columnEntity } from '.'

const createColumnApi = async (payload: CreateColumnPayloadModel) => {
  const { error } = await columnEntity().insert(payload)
  if (error) throw error
}

export { createColumnApi }
