import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, closestCenter } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Stack } from '@/components/mui'
import { TaskModel } from '@/lib/models/task.model'

import { board } from './project'
import TaskCard from './TaskCard'

const DndContextWrapper = ({
  children,
  height,
  columns,
  dragTask,
  setDragTask,
  setColumns,
  setActiveColumn
}: {
  children: ReactNode
  height?: string | number
  columns: typeof board
  dragTask: TaskModel | null
  setDragTask: Dispatch<SetStateAction<TaskModel | null>>
  setColumns: Dispatch<SetStateAction<typeof board>>
  setActiveColumn: Dispatch<SetStateAction<string | null>>
}) => {
  const onDragStart = (event: DragOverEvent) => {
    const { active } = event
    const sourceColumn = columns.find((col) => col.tasks.some((task) => task.id === active.id))
    if (!sourceColumn) return

    const activeTaskIndex = sourceColumn.tasks.findIndex((task) => task.id === active.id)
    const activeTask = sourceColumn.tasks[activeTaskIndex]
    setDragTask(activeTask)
  }

  const onDragOver = (event: DragOverEvent) => {
    const { over } = event
    if (!over) return

    const targetColumn = columns.find(
      (col) => col.tasks.some((task) => task.id === over.id) || col.id === over.id
    )

    if (!targetColumn) return
    setActiveColumn(targetColumn?.id)
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    setDragTask(null)
    setActiveColumn(null)

    setColumns((prevColumns) => {
      // Find source and target columns
      const sourceColumn = prevColumns.find((col) =>
        col.tasks.some((task) => task.id === active.id)
      )
      const targetColumn = prevColumns.find(
        (col) => col.tasks.some((task) => task.id === over.id) || col.id === over.id
      )

      if (!sourceColumn || !targetColumn) return prevColumns

      // Find active task
      const activeTaskIndex = sourceColumn.tasks.findIndex((task) => task.id === active.id)
      const activeTask = sourceColumn.tasks[activeTaskIndex]

      // If moving within the same column (Reordering)
      if (sourceColumn.id === targetColumn.id) {
        const overTaskIndex = targetColumn.tasks.findIndex((task) => task.id === over.id)

        return prevColumns.map((col) =>
          col.id === sourceColumn.id
            ? { ...col, tasks: arrayMove(col.tasks, activeTaskIndex, overTaskIndex) }
            : col
        )
      }

      // If moving to a different column
      return prevColumns.map((col) => {
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== active.id)
          }
        }
        if (col.id === targetColumn.id) {
          return {
            ...col,
            tasks: [...col.tasks, activeTask]
          }
        }
        return col
      })
    })
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <Stack direction="column" height={height}>
        <DragOverlay
          dropAnimation={{
            duration: 500,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
          }}
        >
          {dragTask ? <TaskCard task={dragTask} /> : null}
        </DragOverlay>
        {children}
      </Stack>
    </DndContext>
  )
}

export default DndContextWrapper
