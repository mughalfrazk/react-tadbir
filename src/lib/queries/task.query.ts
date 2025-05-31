import { useMutation } from '@tanstack/react-query'

import { CreateTaskPayloadModel, TaskModel, UpdateTaskPayloadModel } from '../models/task.model'
import {
  createTaskApi,
  deleteTaskApi,
  switchTaskColumnApi,
  updateTaskApi
} from '../services/task.service'

// const useGetColumnListQuery = ({ project_id }: { project_id: string }) => {
//   return useQuery({
//     queryKey: ['column_list', project_id],
//     queryFn: () => getAllUserColumnApi(project_id),
//     enabled: Boolean(project_id)
//   })
// }

const useCreateTaskMutation = ({ onSuccess }: { onSuccess: (task: TaskModel) => void }) => {
  return useMutation({
    mutationFn: (payload: CreateTaskPayloadModel) => createTaskApi(payload),
    onSuccess
  })
}

const useUpdateTaskMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: ({ taskId, payload }: { taskId: string; payload: UpdateTaskPayloadModel }) =>
      updateTaskApi(taskId, payload),
    onSuccess
  })
}

const useSwtichTaskColumnMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: ({ task_id, column_id }: { task_id: string; column_id: string }) =>
      switchTaskColumnApi(task_id, column_id),
    onSuccess
  })
}

const useDeleteTaskMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: ({ task_id }: { task_id: string }) => deleteTaskApi(task_id),
    onSuccess
  })
}

export {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useSwtichTaskColumnMutation,
  useDeleteTaskMutation
}
