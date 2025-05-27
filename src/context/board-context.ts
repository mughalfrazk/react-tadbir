import { Dispatch, SetStateAction, createContext, useContext } from 'react'

import { ColumnListModel } from '@/lib/models/column.model'
import { TaskWithAssigneesModel } from '@/lib/models/task.model'
import { TaskAssigneeModel } from '@/lib/models/task_assignee.model'

export type BoardContext = {
  columns: ColumnListModel
  setColumns: Dispatch<SetStateAction<ColumnListModel>>
  dragTask: TaskWithAssigneesModel | null
  setDragTask: Dispatch<SetStateAction<TaskWithAssigneesModel | null>>
  activeColumn: string | null
  setActiveColumn: Dispatch<SetStateAction<string | null>>
  updateTaskInColumn: (columnId: string, task: TaskWithAssigneesModel) => void
  removeAsigneeFromTask: (userId: string, columnId: string, taskId: string) => void
  addAsigneeToTask: (columnId: string, taskId: string, assignee: TaskAssigneeModel) => void
  deleteTask: (columnId: string, taskId: string) => void
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
  deleteTask: () => {}
})

export default BoardContext
export const useBoard = () => useContext(BoardContext)
