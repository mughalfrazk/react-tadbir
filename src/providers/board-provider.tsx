import { ReactNode, useState } from 'react'

import BoardContext from '@/context/board-context'
import { ColumnListModel } from '@/lib/models/column.model'
import { TaskTagWithTagDetailModel } from '@/lib/models/tag.model'
import { TaskWithAssigneeAndTagModel, UpdateTaskPayloadModel } from '@/lib/models/task.model'
import { TaskAssigneeModel } from '@/lib/models/task_assignee.model'

const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<ColumnListModel>([])
  const [dragTask, setDragTask] = useState<TaskWithAssigneeAndTagModel | null>(null)
  const [activeColumn, setActiveColumn] = useState<string | null>(null)

  const updateTaskInColumn = (columnId: string, task: TaskWithAssigneeAndTagModel) => {
    setColumns((prev) => [
      ...prev.map((c) => (c.id === columnId ? { ...c, task: [task, ...c.task] } : c))
    ])
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

  const addTagToTask = (columnId: string, taskId: string, tag: TaskTagWithTagDetailModel) => {
    const updatedColumns: ColumnListModel = columns.map((c) =>
      c.id === columnId
        ? {
            ...c,
            task: c.task.map((t) =>
              t.id === taskId ? { ...t, task_tag: [...t.task_tag, tag] } : { ...t }
            )
          }
        : { ...c }
    )

    setColumns(updatedColumns)
  }

  const updateDetailToTask = (columnId: string, taskId: string, detail: UpdateTaskPayloadModel) => {
    const updatedColumns: ColumnListModel = columns.map((c) =>
      c.id === columnId
        ? {
            ...c,
            task: c.task.map((t) => (t.id === taskId ? { ...t, ...detail } : { ...t }))
          }
        : { ...c }
    )

    setColumns(updatedColumns)
  }

  const removeTagFromTask = (columnId: string, taskId: string, tagId: number) => {
    const updatedColumns: ColumnListModel = columns.map((c) =>
      c.id === columnId
        ? {
            ...c,
            task: c.task.map((t) =>
              t.id === taskId
                ? { ...t, task_tag: t.task_tag.filter((a) => a.tag.id !== tagId) }
                : { ...t }
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

  const deleteColumn = (columnId: string) => {
    const updatedColumns: ColumnListModel = columns.filter((c) => c.id !== columnId)
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
        deleteTask,
        setActiveColumn,
        deleteColumn,
        updateTaskInColumn,
        removeAsigneeFromTask,
        addAsigneeToTask,
        updateDetailToTask,
        addTagToTask,
        removeTagFromTask
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export default BoardProvider
