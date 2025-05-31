import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import useTadbirStore from '@/store'

import {
  CreateTagPayloadModel,
  TagModel,
  TaskTagModel,
  TaskTagWithTagDetailModel
} from '../models/tag.model'
import {
  createTagApi,
  createTagToTaskApi,
  deleteTaskTagApi,
  getAllTagsApi
} from '../services/tag.service'

const useGetAllTagQuery = ({ project_id }: { project_id: string }) => {
  const { getTags, setTags } = useTadbirStore()

  const {
    data = [],
    isSuccess,
    ...otherQueryProps
  } = useQuery({
    queryKey: ['tags_list', project_id],
    queryFn: () => getAllTagsApi(project_id),
    enabled: Boolean(project_id)
  })

  useEffect(() => {
    if (data && isSuccess) {
      setTags(project_id, [...data])
    }
  }, [data, isSuccess, setTags])

  return { tagList: getTags(project_id) ?? [], isSuccess, ...otherQueryProps }
}

const useCreateTagMutation = ({ onSuccess }: { onSuccess: (tag: TagModel) => void }) => {
  return useMutation({
    mutationFn: (payload: CreateTagPayloadModel) => createTagApi(payload),
    onSuccess
  })
}

const useCreateTaskTagMutation = ({
  onSuccess
}: {
  onSuccess: (tag: TaskTagWithTagDetailModel) => void
}) => {
  return useMutation({
    mutationFn: ({ task_id, tag_id }: { task_id: string; tag_id: number }) =>
      createTagToTaskApi(task_id, tag_id),
    onSuccess
  })
}

const useDeleteTaskTagMutation = ({
  onSuccess
}: {
  onSuccess: (taskTag: TaskTagModel) => void
}) => {
  return useMutation({
    mutationFn: ({ task_tag_id }: { task_tag_id: number }) => deleteTaskTagApi(task_tag_id),
    onSuccess
  })
}

export {
  useGetAllTagQuery,
  useCreateTagMutation,
  useCreateTaskTagMutation,
  useDeleteTaskTagMutation
}
