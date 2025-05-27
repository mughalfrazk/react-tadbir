import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { ReactNode } from 'react'

import { Stack } from '@/components/mui'
import { useBoard } from '@/context/board-context'
import { useSwtichTaskColumnMutation } from '@/lib/queries/task.query'

import TaskCard from './TaskCard'

const DndContextWrapper = ({
  children,
  height
}: {
  children: ReactNode
  height?: string | number
}) => {
  const { columns, setColumns, dragTask, setDragTask, setActiveColumn } = useBoard()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 2 }
    })
  )

  const { mutate } = useSwtichTaskColumnMutation({ onSuccess: () => {} })

  const onDragStart = (event: DragOverEvent) => {
    const { active } = event
    const sourceColumn = columns.find((col) => col.task.some((task) => task.id === active.id))
    if (!sourceColumn) return

    const activeTaskIndex = sourceColumn.task.findIndex((task) => task.id === active.id)
    const activeTask = sourceColumn.task[activeTaskIndex]
    setDragTask(activeTask)
  }

  const onDragOver = (event: DragOverEvent) => {
    const { over } = event
    if (!over) return

    const targetColumn = columns.find(
      (col) => col.task.some((task) => task.id === over.id) || col.id === over.id
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
      const sourceColumn = prevColumns.find((col) => col.task.some((task) => task.id === active.id))
      const targetColumn = prevColumns.find(
        (col) => col.task.some((task) => task.id === over.id) || col.id === over.id
      )

      if (!sourceColumn || !targetColumn) return prevColumns

      // Find active task
      const activeTaskIndex = sourceColumn.task.findIndex((task) => task.id === active.id)
      const activeTask = sourceColumn.task[activeTaskIndex]

      // If moving within the same column (Reordering)
      if (sourceColumn.id === targetColumn.id) {
        const overTaskIndex = targetColumn.task.findIndex((task) => task.id === over.id)

        return prevColumns.map((col) =>
          col.id === sourceColumn.id
            ? { ...col, task: arrayMove(col.task, activeTaskIndex, overTaskIndex) }
            : col
        )
      }

      // If moving to a different column
      return prevColumns.map((col) => {
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            task: col.task.filter((task) => task.id !== active.id)
          }
        }
        if (col.id === targetColumn.id) {
          mutate({ task_id: activeTask.id, column_id: targetColumn.id })
          return {
            ...col,
            task: [...col.task, activeTask]
          }
        }
        return col
      })
    })
  }

  return (
    <DndContext
      sensors={sensors}
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
