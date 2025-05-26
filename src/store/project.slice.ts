import { ProjectDetailModel, ProjectTableListModel } from '@/lib/models/project.model'

import { WithDevtools } from '.'

export type ProjectSlice = {
  projectList: ProjectTableListModel
  setProjectList: (value: ProjectTableListModel) => void

  projectDetail: { [key: string]: ProjectDetailModel } | null
  setProjectDetail: (projectId: string, detail: ProjectDetailModel) => void
  getProjectDetail: (projectId: string) => ProjectDetailModel | null

  // contributors: { [key: string]: Project }
}

export const createProjectSlice: WithDevtools<ProjectSlice> = (set, get) => ({
  projectList: [],
  setProjectList: (projectList) => set(() => ({ projectList }), false, 'project/setProjectList'),

  projectDetail: null,
  getProjectDetail: (projectId: string) => {
    const detail = get().projectDetail?.[projectId]
    return detail ?? null
  },
  setProjectDetail: (projectId: string, detail: ProjectDetailModel) =>
    set(
      (state) => ({
        ...state,
        projectDetail: { ...state.projectDetail, [projectId]: { ...detail } }
      }),
      false,
      'project/setProjectDetail'
    )
})
