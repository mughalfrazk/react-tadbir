import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { Session, useAuth } from '@/context/auth-context'
import useTadbirStore from '@/store'

import { CreateProjectPayloadModel } from '../models/project.model'
import {
  createProjectApi,
  getProjectDetailApi,
  getUserProjectListApi
} from '../services/project.service'

const useGetProjectListQuery = () => {
  const auth = useAuth()
  const { setProjectList } = useTadbirStore()
  const session = auth.session as Session

  const {
    data = [],
    isSuccess,
    ...otherQueryProps
  } = useQuery({
    queryKey: ['project_list', session?.uid],
    queryFn: () => getUserProjectListApi(session?.uid),
    enabled: Boolean(session.uid)
  })

  useEffect(() => {
    if (data && isSuccess) {
      setProjectList(data)
    }
  }, [data, isSuccess, setProjectList])

  return { projectList: data, isSuccess, ...otherQueryProps }
}

const useGetProjectDetailQuery = (project_id: string) => {
  const auth = useAuth()
  const { setProjectDetail, getProjectDetail } = useTadbirStore()
  const session = auth.session as Session

  const { data, isSuccess, ...otherPropsQuery } = useQuery({
    queryKey: ['project_detail', project_id, session?.uid],
    queryFn: () => getProjectDetailApi(project_id, session?.uid),
    enabled: Boolean(project_id && session?.uid)
  })

  useEffect(() => {
    if (data && isSuccess) {
      setProjectDetail(project_id, data)
    }
  }, [data, isSuccess, setProjectDetail])

  return { projectDetail: getProjectDetail(project_id), isSuccess, ...otherPropsQuery }
}

const useCreateProjectMutate = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: (payload: CreateProjectPayloadModel) => createProjectApi(payload),
    onSuccess
  })
}

export { useGetProjectListQuery, useGetProjectDetailQuery, useCreateProjectMutate }
