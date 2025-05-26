import { ReactNode, useState } from 'react'

import BoardContext from '@/context/board-context'
import { ColumnListModel } from '@/lib/models/column.model'
import { TaskWithAssigneesModel } from '@/lib/models/task.model'

const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<ColumnListModel>([])
  const [dragTask, setDragTask] = useState<TaskWithAssigneesModel | null>(null)
  const [activeColumn, setActiveColumn] = useState<string | null>(null)

  const updateTaskInColumn = (columnId: string, task: TaskWithAssigneesModel) => {
    setColumns((prev) => [
      ...prev.map((c) => (c.id === columnId ? { ...c, tasks: [task, ...c.tasks] } : c))
    ])
  }

  const removeAsigneeInTask = (_: string, __: string) => {
    console.log(_)
    console.log(__)
  }

  return (
    <BoardContext.Provider
      value={{
        columns,
        setColumns,
        dragTask,
        setDragTask,
        activeColumn,
        setActiveColumn,
        updateTaskInColumn,
        removeAsigneeInTask
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export default BoardProvider
