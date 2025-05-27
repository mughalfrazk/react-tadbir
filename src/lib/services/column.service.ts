import { CreateColumnPayloadModel } from '../models/column.model'

import { columnEntity } from '.'

const createColumnApi = async (payload: CreateColumnPayloadModel) => {
  const { error } = await columnEntity().insert(payload)
  if (error) throw error
}

const deleteColumnApi = async (column_id: string) => {
  const { data, error } = await columnEntity().delete().eq('id', column_id).select('*')

  if (error) throw error
  return data
}

export { createColumnApi, deleteColumnApi }
