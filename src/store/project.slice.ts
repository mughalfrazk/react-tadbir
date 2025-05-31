import { ProjectDetailModel, ProjectTableListModel } from '@/lib/models/project.model'
import { TagListModel } from '@/lib/models/tag.model'

import { WithDevtools } from '.'

export type ProjectSlice = {
  projectList: ProjectTableListModel
  setProjectList: (value: ProjectTableListModel) => void

  projectDetail: { [key: string]: ProjectDetailModel } | null
  setProjectDetail: (projectId: string, detail: ProjectDetailModel) => void
  getProjectDetail: (projectId: string) => ProjectDetailModel | null

  tags: { [key: string]: TagListModel } | null
  setTags: (projectId: string, detail: TagListModel) => void
  getTags: (projectId: string) => TagListModel | null
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
    ),

  tags: null,
  getTags: (projectId: string) => {
    const tagList = get().tags?.[projectId]
    return tagList ?? null
  },
  setTags: (projectId: string, tagList: TagListModel) => {
    return set(
      (state) => ({
        ...state,
        tags: { ...state.tags, [projectId]: [...tagList] }
      }),
      false,
      'project/setTags'
    )
  }
})
