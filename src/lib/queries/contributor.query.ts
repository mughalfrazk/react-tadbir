import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createContributorApi,
  deleteContributorApi,
  getAllContributorsApi
} from '../services/contributor.service'

const useGetProjectUsersListQuery = (project_id: string) => {
  return useQuery({
    queryKey: ['project_users_list', project_id],
    queryFn: () => getAllContributorsApi(project_id),
    enabled: Boolean(project_id)
  })
}

const useCreateProjectContributorMutation = ({
  project_id,
  onSuccess
}: {
  project_id: string
  onSuccess: () => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ project_id, profile_id }: { project_id: string; profile_id: string }) =>
      createContributorApi(project_id, profile_id),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['project_users_list', project_id] })
    }
  })
}

const useDeleteProjectUserMutation = ({
  project_id,
  onSuccess
}: {
  project_id: string
  onSuccess: () => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ project_id, profile_id }: { project_id: string; profile_id: string }) =>
      deleteContributorApi(project_id, profile_id),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['project_users_list', project_id] })
    }
  })
}

export {
  useGetProjectUsersListQuery,
  useCreateProjectContributorMutation,
  useDeleteProjectUserMutation
}
