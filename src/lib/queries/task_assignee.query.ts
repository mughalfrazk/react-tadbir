import { useMutation } from '@tanstack/react-query'

import { TaskAssigneeModel, TaskAssigneeRowModel } from '../models/task_assignee.model'
import { createTaskAssigneeApi, deleteTaskAssigneeApi } from '../services/task_assignee.service'

const useCreateTaskAssigneeMutation = ({
  onSuccess
}: {
  onSuccess: (result: TaskAssigneeModel) => void
}) => {
  return useMutation({
    mutationFn: ({ task_id, user_id }: { task_id: string; user_id: string }) =>
      createTaskAssigneeApi(task_id, user_id),
    onSuccess
  })
}

const useDeleteTaskAssignmentMutation = ({
  onSuccess
}: {
  onSuccess: (result: TaskAssigneeRowModel) => void
}) => {
  return useMutation({
    mutationFn: ({ task_id, user_id }: { task_id: string; user_id: string }) =>
      deleteTaskAssigneeApi(task_id, user_id),
    onSuccess
  })
}

export { useCreateTaskAssigneeMutation, useDeleteTaskAssignmentMutation }
