import { Dispatch, SetStateAction, createContext, useContext } from 'react'

import { ColumnListModel } from '@/lib/models/column.model'
import { TaskTagWithTagDetailModel } from '@/lib/models/tag.model'
import { TaskWithAssigneeAndTagModel, UpdateTaskPayloadModel } from '@/lib/models/task.model'
import { TaskAssigneeModel } from '@/lib/models/task_assignee.model'

export type BoardContext = {
  columns: ColumnListModel
  setColumns: Dispatch<SetStateAction<ColumnListModel>>
  dragTask: TaskWithAssigneeAndTagModel | null
  setDragTask: Dispatch<SetStateAction<TaskWithAssigneeAndTagModel | null>>
  activeColumn: string | null
  setActiveColumn: Dispatch<SetStateAction<string | null>>
  updateTaskInColumn: (columnId: string, task: TaskWithAssigneeAndTagModel) => void
  removeAsigneeFromTask: (userId: string, columnId: string, taskId: string) => void
  addAsigneeToTask: (columnId: string, taskId: string, assignee: TaskAssigneeModel) => void
  deleteTask: (columnId: string, taskId: string) => void
  deleteColumn: (columnId: string) => void
  addTagToTask: (columnId: string, taskId: string, tag: TaskTagWithTagDetailModel) => void
  updateDetailToTask: (columnId: string, taskId: string, detail: UpdateTaskPayloadModel) => void
  removeTagFromTask: (columnId: string, taskId: string, tagId: number) => void
}

const BoardContext = createContext<BoardContext>({
  columns: [],
  setColumns: () => {},
  dragTask: null,
  setDragTask: () => {},
  activeColumn: null,
  setActiveColumn: () => {},
  updateTaskInColumn: () => {},
  removeAsigneeFromTask: () => {},
  addAsigneeToTask: () => {},
  deleteTask: () => {},
  deleteColumn: () => {},
  addTagToTask: () => {},
  updateDetailToTask: () => {},
  removeTagFromTask: () => {}
})

export default BoardContext
export const useBoard = () => useContext(BoardContext)
