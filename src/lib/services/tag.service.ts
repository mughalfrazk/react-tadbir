import { parseFactory } from '@/utils/parse-factory'

import {
  CreateTagPayloadModel,
  TagListSchema,
  TagSchema,
  TaskTagModel,
  TaskTagSchema,
  TaskTagWithTagDetailSchema
} from '../models/tag.model'

import { tagEntity, taskTagEntity } from '.'

const TagListDataParser = parseFactory(TagListSchema, 'TagListDataParser')
const TagDataParser = parseFactory(TagSchema, 'TagDataParser')
const TaskTagWithTagDetailDataParser = parseFactory(
  TaskTagWithTagDetailSchema,
  'TaskTagWithTagDetailDataParser'
)
const TaskTagDataParser = parseFactory(TaskTagSchema, 'TaskTagDataParser')

const getAllTagsApi = async (project_id: string) => {
  const { data, error } = await tagEntity().select('*').eq('project_id', project_id)

  if (error) throw error
  return TagListDataParser(data)
}

const createTagApi = async (payload: CreateTagPayloadModel) => {
  const { data, error } = await tagEntity().upsert(payload).select('*')

  if (error) throw error
  return TagDataParser(data?.[0])
}

const createTagToTaskApi = async (task_id: string, tag_id: number) => {
  const { data: duplication_data, error: duplication_err } = await taskTagEntity()
    .select('id')
    .eq('task_id', task_id)
    .eq('tag_id', tag_id)

  if (duplication_err) throw duplication_err
  if (duplication_data.length) throw Error('Tag already exists.')

  const { data, error } = await taskTagEntity()
    .upsert({ task_id, tag_id })
    .select('id, tag (id, name, color)')

  if (error) throw error
  return TaskTagWithTagDetailDataParser(data?.[0])
}

const deleteTaskTagApi = async (task_tag_id: number): Promise<TaskTagModel> => {
  const { data, error } = await taskTagEntity().delete().eq('id', task_tag_id).select()

  if (error) throw error
  return TaskTagDataParser(data?.[0])
}

export { getAllTagsApi, createTagApi, createTagToTaskApi, deleteTaskTagApi }
