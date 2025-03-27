import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  closestCenter,
  useDroppable
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import Typography from '../../components/mui/Typography'
import Divider from '../../components/mui/Divider'
import Stack from '../../components/mui/Stack'
import Card from '../../components/mui/Card'
import { board, TaskType } from './project'
import { lightDark } from '../../utils/functions'
import { useTheme } from '@mui/material'
import TaskCard from '../../components/board/TaskCard'

export default function KanbanBoard() {
  const [columns, setColumns] = useState(board)
  const [dragTask, setDragTask] = useState<TaskType | null>(null)
  const [activeColumn, setActiveColumn] = useState<string | null>(null)

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
      <Stack direction="column" spacing={2}>
        <Stack m={0} px={2} pt={2} pb={0}>
          <Typography variant="h6">Ipro Fix</Typography>
          <Typography variant="subtitle1">project.description</Typography>
        </Stack>
        <Divider />
        <DragOverlay
          dropAnimation={{
            duration: 500,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
          }}
        >
          {dragTask ? (
            <div className="mb-2 cursor-grab">
              <TaskCard task={dragTask} />
            </div>
          ) : null}
        </DragOverlay>
        <Stack direction="row" spacing={2} px={3} sx={{ overflowY: 'auto' }}>
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.column_name}
              tasks={column.tasks}
              dragTask={dragTask}
              activeColumn={activeColumn}
            />
          ))}
        </Stack>
      </Stack>
    </DndContext>
  )
}

function Column({
  id,
  title,
  tasks,
  dragTask,
  activeColumn
}: {
  id: string
  title: string
  tasks: TaskType[]
  dragTask: TaskType | null
  activeColumn: string | null
}) {
  const theme = useTheme()
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="rounded">
      <h3 className="font-bold mb-2">
        {id}: {title}
      </h3>
      <Card
        sx={lightDark(
          {
            padding: 1,
            width: 300,
            minWidth: 300,
            overflowY: 'auto',
            overflowX: 'hidden',
            height: 'calc(100vh - 220px)',
            backgroundColor: theme.palette.grey[50],
            border: activeColumn === id ? 1 : 1,
            borderColor: activeColumn === id ? theme.palette.primary.main : theme.palette.grey[50]
          },
          {
            backgroundColor: theme.palette.grey[800],
            borderColor: activeColumn === id ? theme.palette.primary.main : theme.palette.grey[800]
          }
        )}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <Task key={task.id} id={task.id} task={task} dragTask={dragTask} />
          ))}
        </SortableContext>
      </Card>
    </div>
  )
}

function Task({ id, task, dragTask }: { id: string; task: TaskType; dragTask: TaskType | null }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`mb-2 cursor-grab`}
      style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}
    >
      <div className={`${dragTask?.id === id ? 'invisible' : 'visible'}`}>
        <TaskCard task={task} />
      </div>
    </div>
  )
}
