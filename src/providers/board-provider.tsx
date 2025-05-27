import { ReactNode, useState } from 'react'

import BoardContext from '@/context/board-context'
import { ColumnListModel } from '@/lib/models/column.model'
import { TaskWithAssigneesModel } from '@/lib/models/task.model'
import { TaskAssigneeModel } from '@/lib/models/task_assignee.model'

const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<ColumnListModel>([])
  const [dragTask, setDragTask] = useState<TaskWithAssigneesModel | null>(null)
  const [activeColumn, setActiveColumn] = useState<string | null>(null)

  const updateTaskInColumn = (columnId: string, task: TaskWithAssigneesModel) => {
    setColumns((prev) => [
      ...prev.map((c) => (c.id === columnId ? { ...c, task: [task, ...c.task] } : c))
    ])
  }

  const removeAsigneeFromTask = (userId: string, columnId: string, taskId: string) => {
    const updatedColumns: ColumnListModel = columns.map((c) =>
      c.id === columnId
        ? {
            ...c,
            task: c.task.map((t) =>
              t.id === taskId
                ? { ...t, task_assignee: t.task_assignee.filter((a) => a.profile.id !== userId) }
                : { ...t }
            )
          }
        : { ...c }
    )

    setColumns(updatedColumns)
  }

  const addAsigneeToTask = (columnId: string, taskId: string, assignee: TaskAssigneeModel) => {
    const updatedColumns: ColumnListModel = columns.map((c) =>
      c.id === columnId
        ? {
            ...c,
            task: c.task.map((t) =>
              t.id === taskId ? { ...t, task_assignee: [...t.task_assignee, assignee] } : { ...t }
            )
          }
        : { ...c }
    )

    setColumns(updatedColumns)
  }

  const deleteTask = (columnId: string, taskId: string) => {
    const updatedColumns: ColumnListModel = columns.map((c) =>
      c.id === columnId
        ? {
            ...c,
            task: c.task.filter((t) => t.id !== taskId)
          }
        : { ...c }
    )

    setColumns(updatedColumns)
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
        removeAsigneeFromTask,
        addAsigneeToTask,
        deleteTask
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export default BoardProvider
