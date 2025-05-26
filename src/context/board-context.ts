import { Dispatch, SetStateAction, createContext, useContext } from 'react'

import { ColumnListModel } from '@/lib/models/column.model'
import { TaskWithAssigneesModel } from '@/lib/models/task.model'

export type BoardContext = {
  columns: ColumnListModel
  setColumns: Dispatch<SetStateAction<ColumnListModel>>
  dragTask: TaskWithAssigneesModel | null
  setDragTask: Dispatch<SetStateAction<TaskWithAssigneesModel | null>>
  activeColumn: string | null
  setActiveColumn: Dispatch<SetStateAction<string | null>>
  updateTaskInColumn: (columnId: string, task: TaskWithAssigneesModel) => void
  removeAsigneeInTask: (user_id: string, task_id: string) => void
}

const BoardContext = createContext<BoardContext>({
  columns: [],
  setColumns: () => {},
  dragTask: null,
  setDragTask: () => {},
  activeColumn: null,
  setActiveColumn: () => {},
  updateTaskInColumn: () => {},
  removeAsigneeInTask: () => {}
})

export default BoardContext
export const useBoard = () => useContext(BoardContext)
