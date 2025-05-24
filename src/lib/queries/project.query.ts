import { useMutation, useQuery } from '@tanstack/react-query'

import { Session, useAuth } from '@/context/auth-context'

import { CreateProjectPayloadModel } from '../models/project.model'
import {
  createProjectApi,
  getAllUserProjectsApi,
  getProjectDetailApi
} from '../services/project.service'

const useGetProjectListQuery = () => {
  const auth = useAuth()
  const session = auth.session as Session

  return useQuery({
    queryKey: ['project_list', session?.uid],
    queryFn: () => getAllUserProjectsApi(session?.uid),
    enabled: Boolean(session.uid)
  })
}

const useGetProjectDetailQuery = (project_id: string) => {
  return useQuery({
    queryKey: ['project_detail', project_id],
    queryFn: () => getProjectDetailApi(project_id),
    enabled: Boolean(project_id)
  })
}

const useCreateProjectMutate = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: (payload: CreateProjectPayloadModel) => createProjectApi(payload),
    onSuccess
  })
}

export { useGetProjectListQuery, useGetProjectDetailQuery, useCreateProjectMutate }
