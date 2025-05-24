import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CreateColumnPayloadModel } from '../models/column.model'
import { createColumnApi } from '../services/column.service'
// import { createColumnApi, getAllUserColumnApi } from '../services/column.service'

const useGetColumnListQuery = ({ project_id }: { project_id: string }) => {
  return useQuery({
    queryKey: ['column_list', project_id],
    queryFn: () => {},
    enabled: Boolean(project_id)
  })
}

const useCreateColumnMutate = ({
  project_id,
  onSuccess
}: {
  project_id: string
  onSuccess: () => void
}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateColumnPayloadModel) => createColumnApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project_detail', project_id] })
      onSuccess()
    }
  })
}

export { useGetColumnListQuery, useCreateColumnMutate }
