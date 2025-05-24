import { useMutation } from '@tanstack/react-query'

import { CreateTaskPayloadModel } from '../models/task.model'
import { createTaskApi } from '../services/task.service'

// const useGetColumnListQuery = ({ project_id }: { project_id: string }) => {
//   return useQuery({
//     queryKey: ['column_list', project_id],
//     queryFn: () => getAllUserColumnApi(project_id),
//     enabled: Boolean(project_id)
//   })
// }

const useCreateTaskMutate = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: (payload: CreateTaskPayloadModel) => createTaskApi(payload),
    onSuccess
  })
}

export { useCreateTaskMutate }
